-- ════════════════════════════════════════════════════════════════════════════
-- Migration 006: Identity & Sessions
-- ════════════════════════════════════════════════════════════════════════════
--
-- WHY THIS MODEL EXISTS
--
-- The app allows gameplay without any account. Anonymous visitors are tracked
-- by a session_id stored in an HTTP-only cookie (set by Next.js middleware).
-- After the quiz, the user may optionally submit their name and phone number
-- to appear on the leaderboard.
--
-- IDENTITY DESIGN
--
-- normalized_phone is the durable identity key.
--   - It is unique, stable, and device-independent.
--   - If a user clears their cookies and returns later, submitting the same
--     phone number re-links them to their existing record.
--   - Names (first_name, last_initial) are display values only. They are
--     NOT used for matching and are preserved on re-submission to prevent
--     accidental overwrites from typos.
--
-- session_id is temporary continuity only.
--   - It identifies a browser session before the user reveals who they are.
--   - It is used to attribute quiz completions and streak state.
--   - Once the user submits their phone, the session is linked to the user
--     record. If the session is later lost (cookie cleared), the next
--     session is re-linked by phone on the next capture.
--
-- WORKFLOW
--   1. Visitor arrives → middleware sets HTTP-only session_id cookie.
--   2. App calls GET /api/session → upserts sessions row, returns session_id.
--   3. User completes quiz → daily_results row inserted with session_id.
--   4. User submits contact → POST /api/identity:
--        a. Normalize phone → look up users by normalized_phone.
--        b. Found: update sms_consent; preserve existing name.
--           Not found: insert new user.
--        c. Link sessions.user_id = users.id.
--        d. Backfill daily_results.user_id for today's row.
--        e. Insert leaderboard + leads records.
--
-- ════════════════════════════════════════════════════════════════════════════


-- ── updated_at trigger function ───────────────────────────────────────────────
--
-- Shared by both tables below. CREATE OR REPLACE is idempotent — safe to
-- re-run if the function already exists from a prior migration.

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ── users ─────────────────────────────────────────────────────────────────────
--
-- One row per real person. Deduplicated by normalized_phone (E.164 format).
--
-- normalized_phone (+1XXXXXXXXXX) is the join key used by /api/identity when
-- matching a returning user across different sessions or devices.
--
-- raw_phone stores exactly what the user typed (after stripping non-digits)
-- for support/debugging purposes. It is never used for matching.
--
-- first_name and last_initial are display fields for the leaderboard only.
-- They are intentionally NOT part of any unique constraint — the same name
-- can appear on multiple accounts, and names must not be used to merge users.

CREATE TABLE IF NOT EXISTS public.users (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Normalized to E.164 (+1XXXXXXXXXX). This is the deduplication key.
  -- UNIQUE constraint prevents duplicate users from the same phone number
  -- regardless of which session, device, or name variant was used.
  normalized_phone text        NOT NULL,

  -- Raw 10-digit string as entered by the user (non-digits stripped).
  -- Stored for reference only; not used for identity matching.
  raw_phone        text,

  -- Display name components. Preserved on re-submission — see /api/identity.
  first_name       text,
  last_initial     text,

  sms_consent      boolean     NOT NULL DEFAULT false,

  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT users_normalized_phone_key UNIQUE (normalized_phone)
);

-- updated_at trigger
CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Primary lookup: /api/identity queries by normalized_phone on every save.
CREATE INDEX IF NOT EXISTS idx_users_normalized_phone
  ON public.users (normalized_phone);


-- ── sessions ──────────────────────────────────────────────────────────────────
--
-- One row per browser session. Created/refreshed by GET /api/session.
--
-- session_id matches the value in the HTTP-only cookie set by middleware.ts.
-- It is a UUID generated on first visit and persists for 1 year unless the
-- user clears cookies or uses a different browser/device.
--
-- user_id is NULL for anonymous sessions and is set when the user submits
-- their phone number via the capture form. If a session is lost and the user
-- returns with a new session_id but the same phone, the NEW session gets
-- linked while the old one retains its user_id reference.
--
-- last_seen_at is updated on every GET /api/session call, enabling future
-- stale-session cleanup jobs (e.g. DELETE WHERE last_seen_at < now() - interval '2 years').

CREATE TABLE IF NOT EXISTS public.sessions (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Matches the browser cookie. Unique — one DB row per active session.
  session_id   text        NOT NULL,

  -- NULL for anonymous sessions. Populated by /api/identity after phone capture.
  -- ON DELETE SET NULL: if a user record is deleted, sessions become anonymous
  -- again rather than being cascade-deleted (preserves quiz history).
  user_id      uuid        REFERENCES public.users(id) ON DELETE SET NULL,

  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT sessions_session_id_key UNIQUE (session_id)
);

-- updated_at trigger
CREATE TRIGGER sessions_updated_at
  BEFORE UPDATE ON public.sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Primary lookup: every /api/session and /api/identity call hits this index.
CREATE INDEX IF NOT EXISTS idx_sessions_session_id
  ON public.sessions (session_id);

-- Supports queries like "all sessions for this user" (admin/analytics use).
CREATE INDEX IF NOT EXISTS idx_sessions_user_id
  ON public.sessions (user_id);


-- ── daily_results: add user_id + indexes ─────────────────────────────────────
--
-- session_id was already present (migration 004). We add user_id here so that
-- after identity capture, quiz results can be attributed to a real person.
--
-- user_id starts NULL and is backfilled by /api/identity after the user saves
-- their score. This means anonymous completions are always preserved — a
-- user who never submits contact info still has their result recorded.

ALTER TABLE public.daily_results
  ADD COLUMN IF NOT EXISTS user_id uuid
    REFERENCES public.users(id) ON DELETE SET NULL;

-- Supports queries like "all daily results for this user" (streaks, history).
CREATE INDEX IF NOT EXISTS idx_daily_results_user_id
  ON public.daily_results (user_id);

-- Supports the hasPlayedToday() check: "did this session play today?"
-- Also used by /api/identity to find the row to backfill.
CREATE INDEX IF NOT EXISTS idx_daily_results_session_date
  ON public.daily_results (session_id, quiz_date);

-- Supports date-range queries (leaderboard aggregation, admin dashboards).
CREATE INDEX IF NOT EXISTS idx_daily_results_quiz_date
  ON public.daily_results (quiz_date);

-- Prevents a session from submitting the daily quiz more than once per day.
-- Partial index: only enforced when session_id is a non-empty value, so rows
-- with a null session_id (edge case: cookie missing) do not block each other.
--
-- NOTE: This constraint is enforced at the DB level as a safety net. The app
-- also guards against this with hasPlayedToday() in localStorage. Both layers
-- are intentional — the DB constraint is the authoritative source of truth.
CREATE UNIQUE INDEX IF NOT EXISTS daily_results_session_date_unique
  ON public.daily_results (session_id, quiz_date)
  WHERE session_id IS NOT NULL AND session_id <> '';


-- ── Row Level Security ────────────────────────────────────────────────────────
--
-- users and sessions contain PII (phone numbers, session linkage). They must
-- NEVER be directly readable or writable by anonymous browser clients.
--
-- All writes go through /api/identity and /api/session, which use the Supabase
-- service-role key (supabaseAdmin). The service role bypasses RLS entirely, so
-- no permissive policies are needed for server-side writes.
--
-- With RLS enabled and no permissive SELECT/INSERT/UPDATE policies, the anon
-- key and authenticated JWT cannot touch these tables at all.

ALTER TABLE public.users    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- ── PROTOTYPE POLICY — REMOVE BEFORE PRODUCTION ──────────────────────────────
-- Uncomment the block below ONLY during local development if you need to
-- inspect users/sessions in the Supabase table editor while logged in as
-- an authenticated user (e.g. your own Supabase Auth account).
--
-- DO NOT enable this in production. It would expose all phone numbers to any
-- authenticated Supabase user. Access should go through a server-side admin
-- dashboard with its own auth layer.
--
-- CREATE POLICY "dev_authenticated_read_users"
--   ON public.users FOR SELECT
--   TO authenticated
--   USING (true);
--
-- CREATE POLICY "dev_authenticated_read_sessions"
--   ON public.sessions FOR SELECT
--   TO authenticated
--   USING (true);
--
-- PRODUCTION ALTERNATIVE: Create scoped policies tied to a specific admin role,
-- or use Supabase's built-in dashboard (service role) to view data directly.
-- ─────────────────────────────────────────────────────────────────────────────

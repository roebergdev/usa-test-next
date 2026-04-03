-- ── Migration 006: Identity & Sessions ────────────────────────────────────────
--
-- Introduces proper identity management:
--   • users     – canonical identity keyed on normalized phone number
--   • sessions  – anonymous sessions, optionally linked to a user after capture
--   • daily_results gets a user_id FK and a unique (session_id, quiz_date) guard
--
-- Workflow:
--   1. Visitor arrives → middleware sets HTTP-only session_id cookie
--   2. /api/session creates/refreshes the sessions row
--   3. After quiz → daily_results row inserted with session_id (client-side)
--   4. User submits contact → /api/identity upserts users, links sessions.user_id,
--      and backfills daily_results.user_id for today's row
--
-- Phone is the durable identity key. Name fields are display-only and are
-- preserved on re-submission to prevent typos overwriting correct values.
-- ──────────────────────────────────────────────────────────────────────────────


-- ── Trigger helper ─────────────────────────────────────────────────────────────
-- Reusable function that stamps updated_at = now() on every UPDATE.

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ── users ──────────────────────────────────────────────────────────────────────
-- One row per real person, deduplicated by normalized E.164 phone number.
-- first_name / last_initial are display values only — not identity keys.

CREATE TABLE IF NOT EXISTS users (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Stored as E.164 (+1XXXXXXXXXX); unique constraint enforces deduplication.
  normalized_phone text        NOT NULL,
  first_name       text,
  last_initial     text,
  sms_consent      boolean     NOT NULL DEFAULT false,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT users_normalized_phone_key UNIQUE (normalized_phone)
);

CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


-- ── sessions ───────────────────────────────────────────────────────────────────
-- One row per browser session (UUID set in the HTTP-only cookie by middleware).
-- user_id is NULL for anonymous sessions; populated after identity capture.
-- last_seen_at is refreshed by GET /api/session on each app load.

CREATE TABLE IF NOT EXISTS sessions (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  -- Matches the value in the browser's session_id HTTP-only cookie.
  session_id   text        NOT NULL,
  -- NULL until the user submits their phone via the capture form.
  user_id      uuid        REFERENCES users(id) ON DELETE SET NULL,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT sessions_session_id_key UNIQUE (session_id)
);

CREATE TRIGGER sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE INDEX IF NOT EXISTS idx_sessions_session_id ON sessions (session_id);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id    ON sessions (user_id);


-- ── daily_results: backfill user_id ────────────────────────────────────────────
-- user_id is NULL until /api/identity runs after quiz completion.

ALTER TABLE daily_results
  ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_daily_results_user_id ON daily_results (user_id);

-- Prevent the same session submitting the daily quiz twice on the same date.
-- EXISTS guard keeps this idempotent if re-run.
CREATE UNIQUE INDEX IF NOT EXISTS daily_results_session_date_key
  ON daily_results (session_id, quiz_date)
  WHERE session_id IS NOT NULL AND session_id <> '';


-- ── RLS ────────────────────────────────────────────────────────────────────────
-- users and sessions are only written from server-side API routes (service role).
-- Enabling RLS with no permissive policies means anon/authenticated clients
-- cannot read or write these tables directly — only the service role can.

ALTER TABLE users    ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

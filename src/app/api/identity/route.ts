import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { stripPhone, toE164, buildDisplayName } from '@/lib/capture';
import { getTodayString } from '@/lib/daily';
import { rateLimit } from '@/lib/rateLimit';
import { SESSION_COOKIE } from '../../../../middleware';

interface IdentityBody {
  firstName: string;
  lastInitial: string;
  phone: string;
  smsConsent: boolean;
  streak: number;
}

/**
 * POST /api/identity
 *
 * Called when the user clicks "Claim My Spot" after the Daily Quiz and
 * submits their name, phone, and SMS consent.
 *
 * This endpoint owns the full identity + score-save flow:
 *
 *   1. Read the session_id from the HTTP-only cookie (server-side only).
 *   2. Normalize the phone to E.164 — this is the durable identity key.
 *   3. Look up an existing user by normalized phone.
 *      - FOUND:   re-use the existing user; update sms_consent/updated_at only.
 *                 Display name (first_name, last_initial) is preserved to prevent
 *                 typos from a later session overwriting a correct earlier value.
 *      - NOT FOUND: create a new user record.
 *   4. Link the current session to the resolved user_id.
 *      If the session row was never created (edge case), it's created here.
 *   5. Backfill user_id on today's daily_results row for this session.
 *   6. Insert a leaderboard entry.
 *   7. Insert a leads record (raw capture; kept separate from canonical users).
 *   8. Fire the SMS notification if smsConsent is true (fire-and-forget).
 *
 * Deduplication guarantee:
 *   If a user clears their cookies and later submits the same phone number,
 *   step 3 matches the existing user record. The new session is re-linked and
 *   no duplicate user is created.
 */
export async function POST(request: NextRequest) {
  // ── Rate limit: 10 submissions per IP per hour ──────────────────────────────
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (!rateLimit(`identity:${ip}`, 10, 60 * 60 * 1000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const sessionId = request.cookies.get(SESSION_COOKIE)?.value;
  if (!sessionId) {
    return NextResponse.json({ error: 'No session' }, { status: 401 });
  }

  // ── Fetch today's result for this session (server-authoritative score) ────────
  // This row is written at quiz completion by the client-side hook.
  // We use its score/time instead of trusting anything the client sends.
  const { data: dailyResult } = await supabaseAdmin
    .from('daily_results')
    .select('score, time_seconds, total_questions, user_id')
    .eq('session_id', sessionId)
    .eq('quiz_date', getTodayString())
    .maybeSingle();

  if (!dailyResult) {
    return NextResponse.json({ error: 'No completed quiz found for this session' }, { status: 400 });
  }

  if (dailyResult.user_id) {
    return NextResponse.json({ error: 'Score already saved for today' }, { status: 409 });
  }

  const verifiedScore = dailyResult.score;
  const verifiedTimeSeconds = dailyResult.time_seconds ?? null;
  const verifiedTotalQuestions = dailyResult.total_questions;

  let body: IdentityBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { firstName, lastInitial, phone, smsConsent, streak } = body;

  // ── 1. Normalize phone ──────────────────────────────────────────────────────
  const digits = stripPhone(phone);
  if (digits.length !== 10) {
    return NextResponse.json({ error: 'Invalid phone number' }, { status: 400 });
  }
  const normalizedPhone = toE164(digits); // → "+1XXXXXXXXXX"

  const now = new Date().toISOString();

  // ── 2 + 3. Resolve user by phone (upsert with name preservation) ─────────────
  // We intentionally avoid a simple upsert here so we can preserve the
  // existing display name on conflict. The Supabase JS upsert would overwrite
  // all columns; instead we SELECT first then branch.

  let userId: string;
  let resolvedDisplayName: string;

  const { data: existingUser } = await supabaseAdmin
    .from('users')
    .select('id, first_name, last_initial')
    .eq('normalized_phone', normalizedPhone)
    .maybeSingle();

  if (existingUser) {
    // Returning user — preserve their stored display name, update consent only.
    await supabaseAdmin
      .from('users')
      .update({ sms_consent: smsConsent, updated_at: now })
      .eq('id', existingUser.id);

    userId = existingUser.id;
    // Use stored name for leaderboard; fall back to submitted values if null.
    resolvedDisplayName = buildDisplayName(
      existingUser.first_name ?? firstName,
      existingUser.last_initial ?? lastInitial
    );
  } else {
    // New user — create the full record.
    const { data: newUser, error: insertError } = await supabaseAdmin
      .from('users')
      .insert({
        normalized_phone: normalizedPhone,
        raw_phone: digits,
        first_name: firstName.trim(),
        last_initial: lastInitial.trim().toUpperCase(),
        sms_consent: smsConsent,
      })
      .select('id')
      .single();

    if (insertError || !newUser) {
      console.error('[api/identity] Failed to create user:', insertError?.message);
      return NextResponse.json({ error: 'Failed to save user' }, { status: 500 });
    }

    userId = newUser.id;
    resolvedDisplayName = buildDisplayName(firstName, lastInitial);
  }

  // ── 4. Link session → user ──────────────────────────────────────────────────
  // Upsert covers the edge case where /api/session was never called (e.g. the
  // session fetch failed silently on mount).
  await supabaseAdmin.from('sessions').upsert(
    {
      session_id: sessionId,
      user_id: userId,
      last_seen_at: now,
    },
    { onConflict: 'session_id', ignoreDuplicates: false }
  );

  // ── 5. Backfill user_id on today's daily_results ────────────────────────────
  // The daily_results row was inserted at quiz completion (before identity was
  // known). Now that we have a user_id, stamp it retroactively.
  await supabaseAdmin
    .from('daily_results')
    .update({ user_id: userId })
    .eq('session_id', sessionId)
    .eq('quiz_date', getTodayString());

  // ── 6. Leaderboard entry ────────────────────────────────────────────────────
  // Extract US state from Vercel's IP geolocation header (e.g. "US-TX" → "TX").
  // Returns null for non-US users or when running locally (header absent).
  const region = request.headers.get('x-vercel-ip-country-region');
  const stateCode = region?.startsWith('US-') ? region.slice(3) : null;

  const { error: lbError } = await supabaseAdmin.from('leaderboard').insert({
    display_name: resolvedDisplayName,
    score: verifiedScore,
    mode: 'daily',
    time_seconds: verifiedTimeSeconds,
    state_code: stateCode,
  });

  // ── 7. Leads record (raw capture) ───────────────────────────────────────────
  // Stored separately from users for CRM/marketing use. Not deduplicated here
  // since users is the canonical identity store.
  // Saved before checking lbError so a leaderboard failure never silently drops a lead.
  console.log('[api/identity] Attempting leads insert:', {
    name: resolvedDisplayName,
    phone: normalizedPhone,
    score: verifiedScore,
    sms_consent: smsConsent,
  });
  const { data: leadsData, error: leadsError } = await supabaseAdmin
    .from('leads')
    .insert({
      name: resolvedDisplayName,
      phone: normalizedPhone,
      type: 'phone',
      score: verifiedScore,
      sms_consent: smsConsent,
    })
    .select();
  if (leadsError) {
    console.error('[api/identity] Failed to insert lead:', leadsError.message, leadsError);
  } else {
    console.log('[api/identity] Lead inserted successfully:', leadsData);
  }

  if (lbError) {
    console.error('[api/identity] Failed to insert leaderboard entry:', lbError.message);
    return NextResponse.json({ error: 'Failed to save score' }, { status: 500 });
  }

  // ── 8. SMS notification (fire-and-forget) ───────────────────────────────────
  // Only sent when the user explicitly opted in via the SMS consent checkbox.
  if (smsConsent) {
    // Derive the base URL for the internal /api/notify call.
    // NEXT_PUBLIC_APP_URL should be set in production (e.g. "https://usatest.com").
    // Falls back to the request Host header for local/preview environments.
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      `${request.headers.get('x-forwarded-proto') ?? 'https'}://${request.headers.get('host')}`;

    fetch(`${baseUrl}/api/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-internal-secret': process.env.INTERNAL_API_SECRET ?? '',
      },
      body: JSON.stringify({
        phone: normalizedPhone,
        firstName: firstName.trim(),
        score: verifiedScore,
        totalQuestions: verifiedTotalQuestions,
        streak,
      }),
    }).catch((err) => {
      console.error('[api/identity] SMS notification failed:', err);
    });
  }

  return NextResponse.json({ ok: true, userId, displayName: resolvedDisplayName });
}

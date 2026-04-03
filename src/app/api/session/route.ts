import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { SESSION_COOKIE } from '../../../../middleware';

/**
 * GET /api/session
 *
 * Purpose: expose the HTTP-only session_id cookie value to client-side code.
 *
 * Because the cookie is httpOnly, JavaScript cannot read it via document.cookie.
 * This endpoint bridges that gap: it reads the cookie server-side and returns
 * the value so the client can use it for Supabase attribution writes
 * (e.g. daily_results.session_id).
 *
 * This is safe because:
 *   - session_id is not a credential — it's an opaque attribution token.
 *   - The httpOnly flag protects against XSS theft of the cookie itself.
 *   - Returning the value here exposes it only to same-origin JS, which is
 *     the same trust level as a non-httpOnly cookie.
 *
 * Side effect: upserts the sessions row so we have a DB record for every
 * active session. last_seen_at is refreshed on each call, enabling activity
 * tracking and eventual stale-session pruning.
 */
export async function GET(request: NextRequest) {
  const sessionId = request.cookies.get(SESSION_COOKIE)?.value;

  // Should not happen — middleware always sets the cookie before any request
  // reaches a route handler. Guard defensively.
  if (!sessionId) {
    return NextResponse.json({ error: 'No session cookie' }, { status: 400 });
  }

  // Upsert the session row:
  //   - First call for this session_id: creates the row.
  //   - Subsequent calls: updates last_seen_at to track recency.
  // user_id stays NULL until /api/identity links the session to a phone number.
  const { error } = await supabaseAdmin.from('sessions').upsert(
    {
      session_id: sessionId,
      last_seen_at: new Date().toISOString(),
    },
    {
      onConflict: 'session_id',
      ignoreDuplicates: false, // always refresh last_seen_at
    }
  );

  if (error) {
    // Non-fatal: log and continue. The client still gets its session_id.
    console.error('[api/session] Failed to upsert session:', error.message);
  }

  return NextResponse.json({ sessionId });
}

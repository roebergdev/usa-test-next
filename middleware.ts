import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { randomUUID } from 'crypto';

/**
 * Session cookie name. Must match the constant used in /api/session and
 * /api/identity, which read it server-side.
 */
export const SESSION_COOKIE = 'session_id';

/**
 * Cookie lifetime: 1 year in seconds.
 * Long enough to persist across browser restarts and typical device cycles.
 * The sessions table tracks last_seen_at so stale rows can be pruned later.
 */
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/**
 * Middleware — runs on every request before the page or API handler.
 *
 * Responsibility: ensure every visitor has a session_id cookie.
 *   - First visit:  generate a UUID, set the cookie, pass the request through.
 *   - Return visit: cookie already present, no-op.
 *
 * Cookie flags:
 *   httpOnly  — not readable by document.cookie or client-side JS (XSS protection).
 *               The value is exposed via GET /api/session for legitimate client use.
 *   secure    — only transmitted over HTTPS in production.
 *   sameSite  — 'lax': sent on top-level navigations and same-site requests,
 *               blocked on cross-site sub-resource requests. Appropriate for a
 *               quiz app with no cross-site POST flows.
 *   maxAge    — 1 year; persists across tab/window close.
 *   path      — '/' so all routes share the same cookie.
 *
 * The session_id is NOT a secret credential. Its security value comes from
 * the httpOnly flag preventing client-side theft — the value itself is safe
 * to return from /api/session so the client can use it for attribution writes.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Return visits: cookie already set — nothing to do.
  if (request.cookies.has(SESSION_COOKIE)) {
    return response;
  }

  // First visit: generate and stamp a new session_id.
  const sessionId = randomUUID();

  response.cookies.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: ONE_YEAR_SECONDS,
    path: '/',
  });

  return response;
}

/**
 * Matcher: run middleware on all routes except Next.js internals and static
 * assets, which don't need session tracking.
 */
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

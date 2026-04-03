import { createClient } from '@supabase/supabase-js';

/**
 * Server-side Supabase client using the service-role key.
 *
 * Bypasses Row Level Security — use ONLY in API route handlers and server
 * actions, never in client components or hooks.
 *
 * Required environment variables (server-only, no NEXT_PUBLIC_ prefix):
 *   SUPABASE_SERVICE_ROLE_KEY  — found in Supabase dashboard → Settings → API
 *
 * The anon key (NEXT_PUBLIC_SUPABASE_ANON_KEY) is intentionally NOT used here;
 * that client is for browser-side reads/writes that go through RLS policies.
 */
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      // Disable automatic session persistence — this client is ephemeral,
      // one instance per request, and has no concept of a logged-in user.
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

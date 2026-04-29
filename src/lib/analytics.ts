/**
 * Analytics abstraction layer.
 *
 * Call `track()` anywhere in the app. In development it logs to the console.
 * In production, drop in the vendor SDK of your choice — each integration
 * point is clearly marked below.
 *
 * To add a vendor:
 *   1. Install the SDK (see comments below).
 *   2. Initialise it in src/app/layout.tsx (or a client provider).
 *   3. Uncomment the relevant block inside `track()`.
 */

// ─── Event catalogue ──────────────────────────────────────────────────────────

export type AnalyticsEvent =
  | 'home_viewed'
  | 'daily_quiz_started'
  | 'daily_quiz_completed'
  | 'daily_results_viewed'
  | 'practice_mode_started'
  | 'save_score_clicked'
  | 'user_info_submitted'
  | 'sms_consent_checked'
  | 'leaderboard_viewed'
  | 'results_percentile_shown'
  | 'streak_shown'
  | 'personal_best_shown'
  | 'leaderboard_preview_shown';

// ─── Property shapes ──────────────────────────────────────────────────────────

export interface AnalyticsProperties {
  /** 'daily' | 'practice' — present on all quiz events */
  quiz_mode?: 'daily' | 'practice';
  /** Final score (number correct) */
  score?: number;
  /** Total questions in the quiz */
  question_count?: number;
  /** Selected category for category-scoped practice sessions */
  question_category?: string;
  /** Consecutive-day streak at the time of the event */
  streak_count?: number;
  /** Whether the user has already saved their score to the leaderboard */
  has_saved_score?: boolean;
  /** ISO date string (YYYY-MM-DD) — today's quiz date */
  date?: string;
  /** For sms_consent_checked: true when box was checked, false when unchecked */
  checked?: boolean;
  /** Tier label shown to user, e.g. "Top 10%", "Top 25%", "Top 50%" */
  percentile_tier?: string;
}

// ─── Core track function ──────────────────────────────────────────────────────

export function track(event: AnalyticsEvent, properties?: AnalyticsProperties): void {
  const payload = properties ?? {};

  // Development: log every event so the team can verify instrumentation
  // without needing a live vendor account.
  if (process.env.NODE_ENV !== 'production') {
    console.log('[analytics]', event, payload);
    return;
  }

  // ── Vercel Analytics custom events ────────────────────────────────────────
  // Pageviews are tracked automatically via <Analytics /> in layout.tsx.
  // Custom events are fired here so product funnels appear in the dashboard.
  import('@vercel/analytics').then(({ track: vaTrack }) => {
    vaTrack(event, payload);
  }).catch(() => {});

  // ── Zoho PageSense ────────────────────────────────────────────────────────
  // PageSense script is loaded via <Script> in layout.tsx.
  // pagesense is the global pushed by their snippet.
  if (typeof window !== 'undefined' && Array.isArray((window as unknown as Record<string, unknown>).pagesense)) {
    (window as unknown as Record<string, unknown[]>).pagesense.push(['trackEvent', event, payload]);
  }
}

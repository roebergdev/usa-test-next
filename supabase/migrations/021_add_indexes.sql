-- Leaderboard: cover the full ORDER BY (mode → score DESC → time_seconds ASC).
-- Supersedes the partial idx_leaderboard_mode index for all ranked queries.
create index if not exists idx_leaderboard_mode_score_time
  on public.leaderboard(mode, score desc, time_seconds asc nulls last);

-- daily_results: cover the session+date lookups used by /api/identity
-- (duplicate-submission check and server-side score fetch).
create index if not exists idx_daily_results_session_date
  on public.daily_results(session_id, quiz_date);

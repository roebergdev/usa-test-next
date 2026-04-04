-- ════════════════════════════════════════════════════════════════════════════
-- Migration 007: Add time_seconds for tiebreaking
-- ════════════════════════════════════════════════════════════════════════════
--
-- Adds time_seconds to leaderboard and daily_results so that players with
-- equal scores are ranked by how quickly they answered.
--
-- Ranking rule: score DESC, time_seconds ASC
--   e.g. 5/28s ranks above 5/34s
--
-- NULL means the record predates this migration (no time data available).
-- The app treats NULL as unranked relative to timed entries.
-- ════════════════════════════════════════════════════════════════════════════

ALTER TABLE public.leaderboard
  ADD COLUMN IF NOT EXISTS time_seconds integer;

ALTER TABLE public.daily_results
  ADD COLUMN IF NOT EXISTS time_seconds integer;

-- Index to support the composite sort: score DESC, time_seconds ASC
CREATE INDEX IF NOT EXISTS idx_leaderboard_score_time
  ON public.leaderboard (score DESC, time_seconds ASC NULLS LAST);

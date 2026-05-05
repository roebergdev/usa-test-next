'use client';

import { useEffect, useState } from 'react';
import { PRACTICE_CATEGORIES } from '@/data/questions';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { motion } from 'motion/react';
import {
  Play,
  CheckCircle2,
  Trophy,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Share2,
} from 'lucide-react';
import { stateFlag } from '@/lib/states';
import {
  getDailyResult,
  getStreak,
  getYesterdayStreak,
  hasSavedScore,
  getTodayString,
  type DailyResult,
} from '@/lib/daily';
import { track } from '@/lib/analytics';

// ─── Placeholder leaderboard rows ─────────────────────────────────────────────
// Shown only when there are no real entries yet.

const PLACEHOLDER_ROWS = [
  { display_name: 'Greg R.', score: 5 },
  { display_name: 'Amy T.', score: 5 },
  { display_name: 'Josh B.', score: 4 },
  { display_name: 'Sarah M.', score: 4 },
  { display_name: 'Mike D.', score: 3 },
];

const HERO_PRACTICE_CATEGORIES = PRACTICE_CATEGORIES.filter(
  (category) =>
    ![
      'Famous Americans',
      'National Parks',
      'US Sports',
    ].includes(category)
);

function getHeroCategoryLabel(category: string) {
  if (category === 'American Culture') return 'Culture';
  return category;
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface HomeScreenProps {
  onPlayDaily: () => void;
  onPlayPractice: () => void;
  onPlayPracticeCategory: (category: string) => void;
}

// ─── Daily Quiz Hero ──────────────────────────────────────────────────────────


function DailyQuizHero({
  dailyResult,
  scoreSaved,
  onPlayDaily,
  onPlayPracticeCategory,
}: {
  dailyResult: DailyResult | null;
  scoreSaved: boolean;
  onPlayDaily: () => void;
  onPlayPracticeCategory: (category: string) => void;
}) {
  const [countdown, setCountdown] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (!dailyResult) return;
    const rawName = typeof window !== 'undefined' ? localStorage.getItem('usa_test_display_name') ?? '' : '';
    const name = rawName.replace(/\.$/, '');
    const params = new URLSearchParams({
      score: String(dailyResult.score),
      total: String(dailyResult.totalQuestions),
      ...(name && { name }),
    });
    const shareUrl = `https://usatest.co/share?${params.toString()}`;
    const shareText = `I scored ${dailyResult.score}/${dailyResult.totalQuestions} on today's USA Test — can you beat me?`;
    if (navigator.share) {
      try { await navigator.share({ title: 'USA Test', text: shareText, url: shareUrl }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  useEffect(() => {
    if (!dailyResult) return;
    function tick() {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diff = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
      const h = String(Math.floor(diff / 3600)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      setCountdown(`${h}:${m}:${s}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [dailyResult]);

  return (
    <div className="relative bg-white border-2 border-amac-blue/10 rounded-3xl sm:rounded-[2.5rem] p-7 sm:p-12 shadow-xl shadow-amac-blue/10 overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amac-blue/8 via-amac-red/4 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="relative space-y-5 sm:space-y-7">
        {/* Headline */}
        <div className="space-y-3">
          <h2 className="text-4xl sm:text-7xl font-black tracking-tight leading-[0.95] uppercase text-amac-dark">
            How Smart{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amac-blue to-amac-red">
              Are You?
            </span>
          </h2>
          <p className="text-sm sm:text-lg font-black tracking-tight text-amac-dark/65">
            Take the 5-question Daily USA Test
          </p>
        </div>

        {/* State 1: not played */}
        {!dailyResult && (
          <button onClick={onPlayDaily} className="group relative w-full sm:w-fit mb-4 sm:mb-6">
            <div className="absolute -inset-1 bg-amac-red rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
            <div className="relative px-8 sm:px-14 py-4 sm:py-5 bg-amac-red text-white rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-2 hover:bg-amac-red/90 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-xl shadow-amac-red/25">
              Start Test
            </div>
          </button>
        )}

        {/* Categories — hidden once score is saved */}
        <div className={`flex flex-wrap gap-x-2 gap-y-3 mt-3 justify-center sm:justify-start ${dailyResult && scoreSaved ? 'hidden' : ''}`}>
          {HERO_PRACTICE_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => onPlayPracticeCategory(category)}
              className="px-3 py-1 rounded-full bg-amac-blue/8 border border-amac-blue/15 text-[11px] sm:text-xs font-black text-amac-blue uppercase tracking-widest hover:bg-amac-blue/12 transition-colors"
            >
              {getHeroCategoryLabel(category)}
            </button>
          ))}
        </div>

        {/* State 2: played but score not saved */}
        {dailyResult && !scoreSaved && (
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-4 bg-amac-blue/5 border border-amac-blue/10 rounded-2xl">
              <CheckCircle2 className="w-5 h-5 text-amac-blue shrink-0" />
              <div>
                <div className="text-sm font-black text-amac-dark">
                  You scored {dailyResult.score}/{dailyResult.totalQuestions} today
                </div>
                <div className="text-xs text-neutral-500 font-medium">
                  Put your name on the leaderboard
                </div>
              </div>
            </div>
            <button
              onClick={onPlayDaily}
              className="w-full sm:w-fit px-8 py-3.5 bg-amac-red text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-amac-red/90 transition-all active:scale-[0.98] shadow-lg shadow-amac-red/20"
            >
              <Trophy className="w-4 h-4" />
              Claim My Spot
            </button>
          </div>
        )}

        {/* State 3: played and score saved */}
        {dailyResult && scoreSaved && (
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl">
            <div>
              <div className="font-black text-green-700 flex items-baseline gap-2">
                <span className="text-2xl">{dailyResult.score}/{dailyResult.totalQuestions}</span>
                <span className="text-2xl">Awesome!</span>
              </div>
              <div className="text-sm sm:text-base text-green-600 font-bold">
                Come back tomorrow to keep your streak going.
              </div>
            </div>
          </div>
        )}

        {/* Share button — shown when score is saved */}
        {dailyResult && scoreSaved && (
          <button
            onClick={handleShare}
            className="w-full py-3.5 bg-amac-red/10 border border-amac-red/20 text-amac-red rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-amac-red/15 transition-all active:scale-[0.98]"
          >
            <Share2 className="w-4 h-4 shrink-0" />
            {copied ? 'Link Copied!' : 'Share My Score'}
          </button>
        )}

        {/* Countdown — shown whenever today's test is complete */}
        {dailyResult && countdown && (
          <div className="text-center pt-1">
            <p className="text-4xl sm:text-5xl font-black text-amac-dark tabular-nums tracking-tight">{countdown}</p>
            <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest mt-1">
              until next test
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Streak Card ──────────────────────────────────────────────────────────────

function StreakCard({
  playedToday,
  streak,
  atRiskStreak,
  onPlayDaily,
}: {
  playedToday: boolean;
  streak: number;
  atRiskStreak: number;
  onPlayDaily: () => void;
}) {
  const streakNum = playedToday ? streak : atRiskStreak;

  return (
    <div className="bg-white border-2 border-orange-100 rounded-2xl p-6 sm:p-8 shadow-md">
      <div className="flex items-center gap-4 sm:gap-5">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amac-blue/5 rounded-2xl flex items-center justify-center shrink-0">
          <span className="text-2xl sm:text-3xl">🔥</span>
        </div>
        <div>
          <div className="font-black text-base sm:text-lg text-amac-red tracking-tight">
            Daily Streak
          </div>
          {streakNum > 0 && (
            <div className="text-sm font-black text-amac-red/70 tracking-tight">
              {streakNum} {streakNum === 1 ? 'day' : 'days'}
            </div>
          )}
        </div>
      </div>
      {!playedToday && atRiskStreak > 0 && (
        <button
          onClick={onPlayDaily}
          className="mt-4 w-full py-2.5 bg-amac-red hover:bg-amac-red/90 text-white rounded-xl font-black text-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Play Now to Keep It
        </button>
      )}
    </div>
  );
}

// ─── Leaderboard Preview ──────────────────────────────────────────────────────

function LeaderboardPreview({
  playedToday,
  onPlayDaily,
}: {
  playedToday: boolean;
  onPlayDaily: () => void;
}) {
  const { leaderboard } = useLeaderboard('daily');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    track('leaderboard_viewed', { quiz_mode: 'daily', date: getTodayString() });
  }, []);

  const isPlaceholder = leaderboard.length === 0;
  const visibleCount = expanded ? leaderboard.length : 5;
  const hasMore = leaderboard.length > 5;
  const rows = isPlaceholder
    ? PLACEHOLDER_ROWS.map((r) => ({ ...r, time_seconds: null as number | null, state_code: null as string | null }))
    : leaderboard.slice(0, visibleCount).map((e) => ({ display_name: e.display_name, score: e.score, time_seconds: e.time_seconds ?? null, state_code: e.state_code ?? null }));

  return (
    <div className="bg-white border-2 border-amac-blue/10 rounded-2xl p-6 sm:p-8 shadow-md flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-4 sm:gap-5 mb-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amac-blue/5 rounded-2xl flex items-center justify-center shrink-0">
          <span className="text-2xl sm:text-3xl">🏆</span>
        </div>
        <span className="font-black text-base sm:text-lg text-amac-dark tracking-tight">
          Today&apos;s Leaderboard
        </span>
        {isPlaceholder && (
          <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest ml-auto">
            Sample
          </span>
        )}
      </div>

      {/* Column headers */}
      <div className="flex items-center justify-between px-2.5 pb-1 mb-1 border-b border-neutral-100">
        <span className="text-[9px] font-black uppercase tracking-widest text-neutral-300">Player</span>
        <span className="text-[9px] font-black uppercase tracking-widest text-neutral-300">Score / Time</span>
      </div>

      {/* Rows */}
      <div className="space-y-1 flex-1">
        {rows.map((entry, i) => {
          const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : null;
          return (
            <div
              key={i}
              className={`flex items-center justify-between px-2.5 py-2 rounded-xl transition-colors ${
                isPlaceholder ? 'opacity-40' : i < 3 ? 'bg-amac-gray/40' : 'hover:bg-amac-gray/40'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {medal ? (
                  <span className="text-base w-5 text-center">{medal}</span>
                ) : (
                  <span className="text-[10px] font-black w-5 text-center text-neutral-300">
                    {String(i + 1)}
                  </span>
                )}
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="font-bold text-sm text-neutral-600 truncate max-w-[80px]">
                    {entry.display_name}
                  </span>
                  {entry.state_code && (
                    <span className="text-xs font-black text-neutral-400 shrink-0">
                      {stateFlag(entry.state_code)} {entry.state_code}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-black text-base text-amac-blue">{entry.score}</span>
                {entry.time_seconds != null && (
                  <span className="text-neutral-400 font-black text-base">{entry.time_seconds}s</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show more / less */}
      {!isPlaceholder && hasMore && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 w-full py-2 text-xs font-black text-amac-blue/70 hover:text-amac-blue transition-colors flex items-center justify-center gap-1"
        >
          {expanded ? (
            <>
              Show less <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              Show all {leaderboard.length} <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}

      {/* CTA */}
      <div className="mt-4 pt-3 border-t border-neutral-100">
        {playedToday ? (
          <p className="text-xs font-black text-green-600 text-center flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            You&apos;re on the board today
          </p>
        ) : (
          <button
            onClick={onPlayDaily}
            className="w-full py-2.5 bg-amac-blue/5 hover:bg-amac-blue/10 border border-amac-blue/10 rounded-xl font-black text-xs text-amac-blue transition-all flex items-center justify-center gap-1.5"
          >
            Can you crack the top 5?
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Practice Row ─────────────────────────────────────────────────────────────

function PracticeRow({ onPlayPractice }: { onPlayPractice: () => void }) {
  return (
    <button
      onClick={onPlayPractice}
      className="w-full text-left group bg-white border-2 border-amac-blue/10 hover:border-amac-blue/30 rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl hover:shadow-amac-blue/10 transition-all duration-300 active:scale-[0.99]"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amac-blue/5 group-hover:bg-amac-blue/10 rounded-2xl flex items-center justify-center transition-colors shrink-0">
            <span className="text-2xl sm:text-3xl">🧠</span>
          </div>
          <div>
            <div className="font-black text-base sm:text-lg text-amac-dark group-hover:text-amac-blue transition-colors tracking-tight">
              Study Mode
            </div>
          </div>
        </div>
        <div className="w-9 h-9 rounded-xl bg-amac-blue/5 group-hover:bg-amac-blue group-hover:text-white flex items-center justify-center transition-all duration-300 shrink-0">
          <Play className="w-4 h-4 text-amac-blue group-hover:text-white transition-colors fill-current" />
        </div>
      </div>
    </button>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

export function HomeScreen({
  onPlayDaily,
  onPlayPractice,
  onPlayPracticeCategory,
}: HomeScreenProps) {
  const [dailyResult] = useState<DailyResult | null>(() => getDailyResult());
  const [scoreSaved] = useState(() => hasSavedScore());
  const [streak] = useState(() => getStreak());
  const [atRiskStreak] = useState(() => getYesterdayStreak());

  useEffect(() => {
    track('home_viewed', {
      quiz_mode: 'daily',
      has_saved_score: scoreSaved,
      streak_count: streak,
      date: getTodayString(),
    });
  }, [scoreSaved, streak]);

  const playedToday = dailyResult !== null;

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      className="max-w-2xl mx-auto space-y-4"
    >
      {/* 1 — Daily Quiz (dominant) */}
      <DailyQuizHero
        dailyResult={dailyResult}
        scoreSaved={scoreSaved}
        onPlayDaily={onPlayDaily}
        onPlayPracticeCategory={onPlayPracticeCategory}
      />

      {/* 2 — Practice mode */}
      <PracticeRow onPlayPractice={onPlayPractice} />

      {/* 3 — Streak + leaderboard preview */}
      <div className="grid sm:grid-cols-2 gap-4">
        <StreakCard
          playedToday={playedToday}
          streak={streak}
          atRiskStreak={atRiskStreak}
          onPlayDaily={onPlayDaily}
        />
        <LeaderboardPreview
          playedToday={playedToday}
          onPlayDaily={onPlayDaily}
        />
      </div>
    </motion.div>
  );
}

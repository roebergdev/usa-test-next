'use client';

import { useEffect, useState } from 'react';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { motion } from 'motion/react';
import {
  CalendarDays,
  Play,
  Dumbbell,
  CheckCircle2,
  Flame,
  Trophy,
  ChevronRight,
  Zap,
} from 'lucide-react';
import {
  getDailyResult,
  getStreak,
  getYesterdayStreak,
  hasSavedScore,
  getTodayString,
  type DailyResult,
} from '@/lib/daily';
import { DAILY_QUIZ_QUESTIONS } from '@/lib/constants';
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

// ─── Props ────────────────────────────────────────────────────────────────────

interface HomeScreenProps {
  onPlayDaily: () => void;
  onPlayPractice: () => void;
}

// ─── Daily Quiz Hero ──────────────────────────────────────────────────────────

function DailyQuizHero({
  dailyResult,
  scoreSaved,
  onPlayDaily,
}: {
  dailyResult: DailyResult | null;
  scoreSaved: boolean;
  onPlayDaily: () => void;
}) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="relative bg-white border border-amac-blue/5 rounded-3xl sm:rounded-[2.5rem] p-7 sm:p-12 shadow-2xl shadow-amac-blue/5 overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amac-blue/8 via-amac-red/4 to-transparent rounded-full blur-[80px] pointer-events-none" />

      <div className="relative space-y-5 sm:space-y-7">
        {/* Badge + date */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amac-blue/5 border border-amac-blue/10 rounded-full text-[9px] sm:text-[10px] text-amac-blue font-black uppercase tracking-[0.2em]">
            <CalendarDays className="w-3 h-3" />
            Today&apos;s Quiz
          </div>
          <p className="text-sm text-neutral-400 font-medium pl-1">{today}</p>
        </div>

        {/* Headline */}
        <div className="space-y-2">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-[0.9] uppercase text-amac-dark">
            Prove your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amac-blue to-amac-red">
              Patriotism.
            </span>
          </h2>
          <p className="text-neutral-500 font-medium text-sm sm:text-base max-w-md">
            {DAILY_QUIZ_QUESTIONS} questions &middot; under a minute &middot; Same quiz for everyone today
          </p>
        </div>

        {/* State 1: not played */}
        {!dailyResult && (
          <button onClick={onPlayDaily} className="group relative w-full sm:w-fit">
            <div className="absolute -inset-1 bg-amac-red rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-500" />
            <div className="relative px-8 sm:px-14 py-4 sm:py-5 bg-amac-red text-white rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 hover:bg-amac-red/90 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-xl shadow-amac-red/25">
              <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
              Take Today&apos;s Quiz
              <ChevronRight className="w-4 h-4 opacity-70" />
            </div>
          </button>
        )}

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
            <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
            <div>
              <div className="text-sm font-black text-green-700">
                {dailyResult.score}/{dailyResult.totalQuestions} — you&apos;re on the board
              </div>
              <div className="text-xs text-green-600 font-medium">
                New quiz drops tomorrow. Don&apos;t break the streak.
              </div>
            </div>
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
  // State 1: Played today, multi-day streak
  if (playedToday && streak > 1) {
    return (
      <div className="bg-orange-50 border border-orange-200 rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-xs font-black uppercase tracking-widest text-orange-500">Your Streak</span>
        </div>
        <div>
          <div className="text-4xl sm:text-5xl font-black tracking-tighter text-orange-500 leading-none">
            {streak}
            <span className="text-lg sm:text-xl font-black text-orange-400 ml-1">days</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-orange-600 mt-1.5">
            Keep it going — come back tomorrow.
          </p>
        </div>
      </div>
    );
  }

  // State 2: Played today, day 1
  if (playedToday && streak <= 1) {
    return (
      <div className="bg-amac-blue/5 border border-amac-blue/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-3">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amac-blue" />
          <span className="text-xs font-black uppercase tracking-widest text-amac-blue">Streak Started</span>
        </div>
        <div>
          <div className="text-4xl sm:text-5xl font-black tracking-tighter text-amac-blue leading-none">
            Day 1
          </div>
          <p className="text-xs sm:text-sm font-medium text-amac-blue/70 mt-1.5">
            Show up tomorrow to make it a habit.
          </p>
        </div>
      </div>
    );
  }

  // State 3: At-risk streak (played yesterday, not today)
  if (!playedToday && atRiskStreak > 0) {
    return (
      <div className="bg-amber-50 border border-amber-300 rounded-2xl sm:rounded-3xl p-5 sm:p-7 space-y-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-amber-500" />
          <span className="text-xs font-black uppercase tracking-widest text-amber-600">Streak at Risk</span>
        </div>
        <div className="space-y-1">
          <div className="text-4xl sm:text-5xl font-black tracking-tighter text-amber-600 leading-none">
            {atRiskStreak}
            <span className="text-lg sm:text-xl font-black text-amber-500 ml-1">days</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-amber-700">
            Play today or lose your streak.
          </p>
        </div>
        <button
          onClick={onPlayDaily}
          className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-black text-sm flex items-center justify-center gap-1.5 transition-all active:scale-[0.98]"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          Play Now
        </button>
      </div>
    );
  }

  // State 4: No streak, not played
  return (
    <div className="bg-white border border-amac-blue/5 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg shadow-amac-blue/5 space-y-3">
      <div className="flex items-center gap-2">
        <Flame className="w-5 h-5 text-neutral-300" />
        <span className="text-xs font-black uppercase tracking-widest text-neutral-400">Daily Streak</span>
      </div>
      <div>
        <div className="text-4xl sm:text-5xl font-black tracking-tighter text-neutral-200 leading-none">
          —
        </div>
        <p className="text-xs sm:text-sm font-medium text-neutral-400 mt-1.5">
          Play daily to build your streak.
        </p>
      </div>
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

  useEffect(() => {
    track('leaderboard_viewed', { quiz_mode: 'daily', date: getTodayString() });
  }, []);

  const isPlaceholder = leaderboard.length === 0;
  const rows = isPlaceholder
    ? PLACEHOLDER_ROWS.map((r) => ({ ...r, time_seconds: null as number | null }))
    : leaderboard.slice(0, 5).map((e) => ({ display_name: e.display_name, score: e.score, time_seconds: e.time_seconds ?? null }));

  return (
    <div className="bg-white border border-amac-blue/5 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-lg shadow-amac-blue/5 flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 bg-yellow-400/15 rounded-lg flex items-center justify-center">
          <Trophy className="w-3.5 h-3.5 text-yellow-500" />
        </div>
        <span className="font-black text-sm uppercase tracking-widest text-amac-dark">
          Today&apos;s Leaderboard
        </span>
        {isPlaceholder && (
          <span className="text-[9px] font-bold text-neutral-300 uppercase tracking-widest ml-auto">
            Sample
          </span>
        )}
      </div>

      {/* Rows */}
      <div className="space-y-0.5 flex-1">
        {rows.map((entry, i) => (
          <div
            key={i}
            className={`flex items-center justify-between px-2.5 py-2 rounded-xl transition-colors ${
              isPlaceholder ? 'opacity-40' : 'hover:bg-amac-gray/60'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className={`text-[10px] font-black w-4 ${i < 3 ? 'text-amac-red' : 'text-neutral-300'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-bold text-sm text-neutral-600 truncate max-w-[100px]">
                {entry.display_name}
              </span>
            </div>
            <span className="font-black text-sm text-amac-blue">
              {entry.score}
              {entry.time_seconds != null && (
                <span className="text-neutral-400 font-bold text-xs">/{entry.time_seconds}s</span>
              )}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-4 pt-3 border-t border-neutral-100">
        {playedToday ? (
          <p className="text-[11px] font-bold text-green-600 text-center flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            You&apos;re on the board today.
          </p>
        ) : (
          <button
            onClick={onPlayDaily}
            className="w-full text-center text-[11px] font-black text-amac-blue hover:text-amac-blue/70 transition-colors flex items-center justify-center gap-1"
          >
            Play to get on the leaderboard
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
      className="w-full text-left group bg-amac-gray border border-amac-blue/5 rounded-2xl p-5 sm:p-6 hover:bg-white hover:shadow-lg hover:shadow-amac-blue/5 transition-all duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white group-hover:bg-amac-blue/5 rounded-xl flex items-center justify-center shadow-sm transition-colors">
            <Dumbbell className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-amac-blue transition-colors" />
          </div>
          <div>
            <div className="font-black text-sm sm:text-base text-amac-dark group-hover:text-amac-blue transition-colors">
              Practice Mode
            </div>
            <div className="text-xs text-neutral-400 font-medium">
              10 questions &middot; Randomized &middot; No streak pressure
            </div>
          </div>
        </div>
        <Play className="w-4 h-4 text-neutral-300 group-hover:text-amac-blue transition-colors fill-current" />
      </div>
    </button>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────

export function HomeScreen({ onPlayDaily, onPlayPractice }: HomeScreenProps) {
  const [dailyResult, setDailyResult] = useState<DailyResult | null>(null);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [streak, setStreak] = useState(0);
  const [atRiskStreak, setAtRiskStreak] = useState(0);

  useEffect(() => {
    const result = getDailyResult();
    const saved = hasSavedScore();
    const streakCount = getStreak();
    setDailyResult(result);
    setScoreSaved(saved);
    setStreak(streakCount);
    setAtRiskStreak(getYesterdayStreak());

    track('home_viewed', {
      quiz_mode: 'daily',
      has_saved_score: saved,
      streak_count: streakCount,
      date: getTodayString(),
    });
  }, []);

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
      <DailyQuizHero dailyResult={dailyResult} scoreSaved={scoreSaved} onPlayDaily={onPlayDaily} />

      {/* 2 — Secondary: streak + leaderboard preview */}
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

      {/* 3 — Tertiary: practice mode */}
      <PracticeRow onPlayPractice={onPlayPractice} />
    </motion.div>
  );
}

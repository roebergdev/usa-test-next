'use client';

import { useEffect, useState } from 'react';
import { Leaderboard } from '@/components/Leaderboard';
import { motion } from 'motion/react';
import { CalendarDays, Play, Dumbbell, CheckCircle2, Flame } from 'lucide-react';
import { getDailyResult, getStreak, type DailyResult } from '@/lib/daily';
import { DAILY_QUIZ_QUESTIONS } from '@/lib/constants';

interface HomeScreenProps {
  onPlayDaily: () => void;
  onPlayPractice: () => void;
}

export function HomeScreen({ onPlayDaily, onPlayPractice }: HomeScreenProps) {
  const [dailyResult, setDailyResult] = useState<DailyResult | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const result = getDailyResult();
    setDailyResult(result);
    if (result) setStreak(getStreak());
  }, []);

  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start"
    >
      {/* Left column */}
      <div className="lg:col-span-7 space-y-6">

        {/* Daily Challenge card — primary CTA */}
        <div className="bg-white border border-amac-blue/5 rounded-3xl sm:rounded-[2.5rem] p-8 sm:p-12 shadow-2xl shadow-amac-blue/5 relative overflow-hidden">
          {/* Background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amac-blue/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative space-y-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amac-blue/5 border border-amac-blue/10 rounded-full text-[9px] sm:text-[10px] text-amac-blue font-black uppercase tracking-[0.2em]">
                  <CalendarDays className="w-3 h-3" />
                  Daily Challenge
                </div>
                <p className="text-sm text-neutral-400 font-medium pl-1">{todayLabel}</p>
              </div>

              {streak > 1 && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-full">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-black text-orange-500">{streak} day streak</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter leading-[0.9] uppercase text-amac-dark">
                Prove your{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amac-blue to-amac-red">
                  Patriotism.
                </span>
              </h2>
              <p className="text-neutral-500 font-medium text-sm sm:text-base max-w-md">
                {DAILY_QUIZ_QUESTIONS} questions · 10 seconds each · Same quiz for everyone today
              </p>
            </div>

            {dailyResult ? (
              /* Already played */
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-2xl">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <div className="text-sm font-black text-green-700">
                      You scored {dailyResult.score}/{dailyResult.totalQuestions} today
                    </div>
                    <div className="text-xs text-green-600 font-medium">
                      Come back tomorrow for a new challenge
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Ready to play */
              <button onClick={onPlayDaily} className="group relative w-full sm:w-fit">
                <div className="absolute -inset-1 bg-amac-red rounded-xl sm:rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                <div className="relative px-8 sm:px-12 py-4 sm:py-5 bg-amac-red text-white rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 hover:bg-amac-red/90 transition-all hover:translate-y-[-2px] active:translate-y-[1px] shadow-xl shadow-amac-red/20">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                  Play Today&apos;s Quiz
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Practice Mode card — secondary CTA */}
        <button
          onClick={onPlayPractice}
          className="w-full text-left group bg-amac-gray border border-amac-blue/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 hover:bg-white hover:shadow-lg hover:shadow-amac-blue/5 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white group-hover:bg-amac-blue/5 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-sm transition-colors">
                <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-400 group-hover:text-amac-blue transition-colors" />
              </div>
              <div>
                <div className="font-black text-base sm:text-lg text-amac-dark group-hover:text-amac-blue transition-colors">
                  Practice Mode
                </div>
                <div className="text-xs sm:text-sm text-neutral-400 font-medium">
                  10 questions · Unlimited plays · Randomized
                </div>
              </div>
            </div>
            <Play className="w-4 h-4 text-neutral-300 group-hover:text-amac-blue transition-colors fill-current" />
          </div>
        </button>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 pt-2 border-t border-amac-blue/5">
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black tracking-tighter text-amac-blue">100+</div>
            <div className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-bold">Questions</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black tracking-tighter text-amac-red">Daily</div>
            <div className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-bold">New Quiz</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-3xl font-black tracking-tighter text-amac-blue">LIVE</div>
            <div className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-bold">Ranking</div>
          </div>
        </div>
      </div>

      {/* Right column — daily leaderboard */}
      <div className="lg:col-span-5">
        <Leaderboard mode="daily" />
      </div>
    </motion.div>
  );
}

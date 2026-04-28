'use client';

import { useLeaderboard } from '@/hooks/useLeaderboard';
import { getRank } from '@/lib/constants';
import { QuizMode } from '@/lib/types';
import { Trophy, Star } from 'lucide-react';
import { motion } from 'motion/react';

interface LeaderboardProps {
  mode?: QuizMode;
}

export function Leaderboard({ mode }: LeaderboardProps) {
  const { leaderboard } = useLeaderboard(mode);

  return (
    <div className="bg-white border border-amac-blue/5 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-amac-blue/5 relative overflow-hidden group">
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amac-blue/5 blur-[100px] rounded-full group-hover:bg-amac-blue/10 transition-all duration-1000"></div>

      <div className="flex items-center justify-between mb-6 sm:mb-10 relative">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-500/10 rounded-lg sm:rounded-xl flex items-center justify-center">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
          </div>
          <h3 className="font-black text-xl sm:text-2xl tracking-tight uppercase text-amac-dark">
            Top Patriots
          </h3>
        </div>
        <div className="px-3 py-1 bg-amac-gray rounded-full text-[8px] sm:text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
          {mode === 'daily' ? 'Daily' : mode === 'practice' ? 'Study' : 'Global'}
        </div>
      </div>

      <div className="space-y-1 sm:space-y-2 relative">
        {leaderboard.length > 0 ? (
          leaderboard.map((entry, i) => (
            <motion.div
              key={entry.id || i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between p-3 sm:p-4 rounded-xl sm:rounded-2xl hover:bg-amac-gray transition-all group/item cursor-default"
            >
              <div className="flex items-center gap-3 sm:gap-5">
                <span
                  className={`w-4 sm:w-6 text-xs sm:text-sm font-black ${
                    i < 3 ? 'text-amac-red' : 'text-neutral-300'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-amac-blue/10 flex items-center justify-center border-2 border-white shadow-sm">
                  <span className="text-xs sm:text-sm font-black text-amac-blue">
                    {entry.display_name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="font-bold text-sm sm:text-base text-neutral-600 group-hover/item:text-amac-dark transition-colors truncate max-w-[100px] sm:max-w-none">
                  {entry.display_name}
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-black text-lg sm:text-xl text-amac-blue tracking-tighter">
                  {entry.score}
                </span>
                <span className="text-[6px] sm:text-[8px] text-neutral-400 uppercase font-black tracking-widest">
                  {getRank(entry.score).name}
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-10 sm:py-20">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-amac-gray rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-neutral-300" />
            </div>
            <p className="text-neutral-400 font-bold uppercase tracking-widest text-[10px] sm:text-xs">
              No records found
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

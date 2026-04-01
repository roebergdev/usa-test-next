'use client';

import { Leaderboard } from '@/components/Leaderboard';
import { motion } from 'motion/react';
import { Play, Star } from 'lucide-react';

interface GameLobbyProps {
  onStartGame: () => void;
  loading: boolean;
}

export function GameLobby({ onStartGame, loading }: GameLobbyProps) {
  return (
    <motion.div
      key="lobby"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start"
    >
      <div className="lg:col-span-7 space-y-8 sm:space-y-12">
        <div className="space-y-4 sm:space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-amac-blue/5 border border-amac-blue/10 rounded-full text-[9px] sm:text-[10px] text-amac-blue font-black uppercase tracking-[0.2em]"
          >
            <Star className="w-3 h-3 fill-current" />
            The Ultimate Trivia Challenge
          </motion.div>
          <h2 className="text-5xl sm:text-8xl font-black tracking-tighter leading-[0.9] sm:leading-[0.85] uppercase text-amac-dark">
            Prove your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amac-blue to-amac-red">
              Patriotism.
            </span>
          </h2>
          <p className="text-neutral-500 text-lg sm:text-xl max-w-xl leading-relaxed font-medium">
            An interactive journey through the heart of America. Test your knowledge on history,
            geography, and the spirit of the USA.
          </p>
        </div>

        <button onClick={onStartGame} disabled={loading} className="group relative w-full sm:w-fit">
          <div className="absolute -inset-1 bg-amac-red rounded-xl sm:rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative px-8 sm:px-12 py-4 sm:py-6 bg-amac-red text-white rounded-xl sm:rounded-2xl font-black text-xl sm:text-2xl flex items-center justify-center gap-4 hover:bg-amac-red/90 transition-all hover:translate-y-[-2px] active:translate-y-[1px] shadow-xl shadow-amac-red/20">
            <Play className="w-6 h-6 sm:w-8 sm:h-8 fill-current" />
            {loading ? 'LOADING...' : 'START CHALLENGE'}
          </div>
        </button>

        <div className="grid grid-cols-3 gap-4 sm:gap-12 pt-8 sm:pt-12 border-t border-amac-blue/5">
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black tracking-tighter text-amac-blue">100+</div>
            <div className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-bold">
              Questions
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black tracking-tighter text-amac-red">10</div>
            <div className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-bold">
              Levels
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl sm:text-4xl font-black tracking-tighter text-amac-blue">LIVE</div>
            <div className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-bold">
              Ranking
            </div>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <Leaderboard />
      </div>
    </motion.div>
  );
}

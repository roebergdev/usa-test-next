'use client';

import { useState } from 'react';
import { getRank } from '@/lib/constants';
import { motion } from 'motion/react';
import { Flag, Play, Trophy } from 'lucide-react';

interface GameOverProps {
  score: number;
  onRestart: () => void;
  onGoToLobby: () => void;
  onSaveScore: (name: string) => Promise<void>;
  scoreSaved: boolean;
}

export function GameOver({ score, onRestart, onGoToLobby, onSaveScore, scoreSaved }: GameOverProps) {
  const [nameInput, setNameInput] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmitName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || saving) return;
    setSaving(true);
    await onSaveScore(nameInput.trim());
    setSaving(false);
  };

  return (
    <motion.div
      key="gameOver"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto text-center space-y-8 sm:space-y-12 py-8 sm:py-12"
    >
      <div className="space-y-4">
        <div className="w-16 h-16 sm:w-24 sm:h-24 bg-amac-red/10 rounded-2xl sm:rounded-[2rem] flex items-center justify-center mx-auto mb-4 sm:mb-8 rotate-12">
          <Flag className="w-8 h-8 sm:w-12 sm:h-12 text-amac-red" />
        </div>
        <h2 className="text-5xl sm:text-7xl font-black tracking-tighter uppercase text-amac-dark">
          Game Over
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-amac-blue/5 shadow-xl shadow-amac-blue/5">
          <div className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1 sm:mb-2">
            Final Rank
          </div>
          <div className="text-4xl sm:text-6xl font-black tracking-tighter text-amac-blue">
            {getRank(score).name}
          </div>
        </div>
        <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-amac-blue/5 shadow-xl shadow-amac-blue/5">
          <div className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1 sm:mb-2">
            Score
          </div>
          <div className="text-4xl sm:text-6xl font-black tracking-tighter text-amac-red">
            {score}/10
          </div>
        </div>
      </div>

      {/* Leaderboard name submission */}
      {score > 0 && !scoreSaved && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-amac-blue/5 shadow-xl shadow-amac-blue/5">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-amac-blue" />
            <span className="text-sm font-black text-amac-blue uppercase tracking-widest">
              Join the Leaderboard
            </span>
          </div>
          <form onSubmit={handleSubmitName} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="text"
              maxLength={30}
              placeholder="Enter your name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-amac-gray border border-amac-blue/10 focus:border-amac-blue/30 rounded-xl outline-none transition-all font-bold text-amac-dark text-center sm:text-left"
              required
            />
            <button
              type="submit"
              disabled={!nameInput.trim() || saving}
              className="px-6 py-3 bg-amac-blue text-white rounded-xl font-black hover:bg-amac-blue/90 transition-all disabled:opacity-50"
            >
              {saving ? 'SAVING...' : 'SUBMIT'}
            </button>
          </form>
        </div>
      )}

      {scoreSaved && (
        <div className="text-sm font-bold text-green-600">
          Score saved to the leaderboard!
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <button
          onClick={onRestart}
          className="w-full sm:w-auto px-12 py-4 sm:py-6 bg-amac-blue text-white rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl hover:bg-amac-blue/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amac-blue/20 flex items-center justify-center gap-3"
        >
          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
          TRY AGAIN
        </button>

        <button
          onClick={onGoToLobby}
          className="w-full sm:w-auto px-12 py-4 sm:py-6 bg-amac-gray text-neutral-500 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95"
        >
          EXIT LOBBY
        </button>
      </div>
    </motion.div>
  );
}

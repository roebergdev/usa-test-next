'use client';

import { useState } from 'react';
import { getRank } from '@/lib/constants';
import { QuizMode } from '@/lib/types';
import { motion } from 'motion/react';
import { Flag, Play, Trophy, Flame, Home } from 'lucide-react';

interface GameOverProps {
  score: number;
  totalQuestions: number;
  mode: QuizMode;
  onRestart?: () => void;
  onGoToLobby: () => void;
  onSaveScore: (name: string) => Promise<void>;
  scoreSaved: boolean;
  playerName?: string;
  streak?: number;
}

export function GameOver({
  score,
  totalQuestions,
  mode,
  onRestart,
  onGoToLobby,
  onSaveScore,
  scoreSaved,
  playerName = '',
  streak = 0,
}: GameOverProps) {
  const [nameInput, setNameInput] = useState(playerName);
  const [saving, setSaving] = useState(false);

  const handleSubmitName = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || saving) return;
    setSaving(true);
    await onSaveScore(nameInput.trim());
    setSaving(false);
  };

  const isDaily = mode === 'daily';

  return (
    <motion.div
      key="gameOver"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto text-center space-y-8 sm:space-y-12 py-8 sm:py-12"
    >
      {/* Header */}
      <div className="space-y-4">
        <div
          className={`w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-[2rem] flex items-center justify-center mx-auto mb-4 sm:mb-8 rotate-12 ${
            isDaily ? 'bg-amac-blue/10' : 'bg-amac-red/10'
          }`}
        >
          <Flag
            className={`w-8 h-8 sm:w-12 sm:h-12 ${isDaily ? 'text-amac-blue' : 'text-amac-red'}`}
          />
        </div>
        <h2 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase text-amac-dark">
          {isDaily ? 'Challenge Complete!' : 'Game Over'}
        </h2>
        {isDaily && (
          <p className="text-neutral-400 font-medium text-sm uppercase tracking-widest">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        )}
      </div>

      {/* Score cards */}
      <div className={`grid gap-4 sm:gap-6 ${isDaily && streak > 1 ? 'grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {!isDaily && (
          <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-amac-blue/5 shadow-xl shadow-amac-blue/5">
            <div className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1 sm:mb-2">
              Final Rank
            </div>
            <div className="text-3xl sm:text-5xl font-black tracking-tighter text-amac-blue leading-tight">
              {getRank(score).name}
            </div>
          </div>
        )}
        <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-amac-blue/5 shadow-xl shadow-amac-blue/5">
          <div className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1 sm:mb-2">
            Score
          </div>
          <div
            className={`text-4xl sm:text-6xl font-black tracking-tighter ${
              isDaily ? 'text-amac-blue' : 'text-amac-red'
            }`}
          >
            {score}/{totalQuestions}
          </div>
        </div>
        {isDaily && streak > 1 && (
          <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-amac-blue/5 shadow-xl shadow-amac-blue/5">
            <div className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1 sm:mb-2">
              Streak
            </div>
            <div className="flex items-center justify-center gap-2">
              <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
              <span className="text-4xl sm:text-6xl font-black tracking-tighter text-orange-500">
                {streak}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Leaderboard name submission */}
      {score > 0 && !scoreSaved && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-amac-blue/5 shadow-xl shadow-amac-blue/5">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-amac-blue" />
            <span className="text-sm font-black text-amac-blue uppercase tracking-widest">
              {isDaily ? 'Save to Daily Leaderboard' : 'Join the Leaderboard'}
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
        <div className="text-sm font-bold text-green-600">Score saved to the leaderboard!</div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        {!isDaily && onRestart && (
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-12 py-4 sm:py-6 bg-amac-blue text-white rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl hover:bg-amac-blue/90 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-amac-blue/20 flex items-center justify-center gap-3"
          >
            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            TRY AGAIN
          </button>
        )}
        <button
          onClick={onGoToLobby}
          className="w-full sm:w-auto px-12 py-4 sm:py-6 bg-amac-gray text-neutral-500 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl hover:bg-neutral-200 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
        >
          <Home className="w-5 h-5 sm:w-6 sm:h-6" />
          {isDaily ? 'HOME' : 'EXIT'}
        </button>
      </div>

      {isDaily && (
        <p className="text-xs text-neutral-400 font-medium">
          Come back tomorrow for a new daily challenge!
        </p>
      )}
    </motion.div>
  );
}

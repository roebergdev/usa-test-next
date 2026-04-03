'use client';

import { useState } from 'react';
import { getRank } from '@/lib/constants';
import { QuizMode } from '@/lib/types';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flag,
  Play,
  Trophy,
  Flame,
  Home,
  CheckCircle2,
  ChevronRight,
  Dumbbell,
  Star,
} from 'lucide-react';

interface GameOverProps {
  score: number;
  totalQuestions: number;
  mode: QuizMode;
  onRestart?: () => void;
  onGoToLobby: () => void;
  onPlayPractice?: () => void;
  /** Practice mode: simple name save */
  onSaveScore?: (name: string) => Promise<void>;
  /** Daily mode: full contact capture */
  onSaveDailyContact?: (
    firstName: string,
    lastInitial: string,
    phone: string
  ) => Promise<void>;
  scoreSaved: boolean;
  playerName?: string;
  streak?: number;
}

function getReinforcement(score: number, total: number): string {
  const pct = score / total;
  if (pct === 1) return "Perfect score — you're a true American patriot!";
  if (pct >= 0.8) return 'Excellent — you really know your American history!';
  if (pct >= 0.6) return 'Good effort — you\'re well above average.';
  if (pct >= 0.4) return 'A solid start — every quiz makes you sharper.';
  return 'Keep going — every patriot starts somewhere.';
}

function getRankEstimate(score: number, total: number): string {
  const pct = score / total;
  if (pct === 1) return 'Top 5% of today\'s players';
  if (pct >= 0.8) return 'Top 20% of today\'s players';
  if (pct >= 0.6) return 'Top 45% of today\'s players';
  if (pct >= 0.4) return 'Top 65% of today\'s players';
  return 'Keep practicing to climb the ranks';
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length < 4) return digits;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

// ─── Daily Results Screen ─────────────────────────────────────────────────────

function DailyResults({
  score,
  totalQuestions,
  streak,
  scoreSaved,
  onSaveDailyContact,
  onPlayPractice,
  onGoToLobby,
}: {
  score: number;
  totalQuestions: number;
  streak: number;
  scoreSaved: boolean;
  onSaveDailyContact?: (f: string, l: string, p: string) => Promise<void>;
  onPlayPractice?: () => void;
  onGoToLobby: () => void;
}) {
  const [showCapture, setShowCapture] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastInitial, setLastInitial] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const previewName =
    firstName.trim()
      ? `${firstName.trim()} ${lastInitial.trim().charAt(0).toUpperCase() || '_'}.`
      : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim() || !lastInitial.trim() || phone.replace(/\D/g, '').length < 10 || saving) return;
    setSaving(true);
    await onSaveDailyContact?.(firstName, lastInitial, phone.replace(/\D/g, ''));
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto space-y-5 sm:space-y-6 py-6 sm:py-10"
    >
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[1.75rem] bg-amac-blue/10 flex items-center justify-center mx-auto rotate-6">
          <Flag className="w-8 h-8 sm:w-10 sm:h-10 text-amac-blue" />
        </div>
        <div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tighter uppercase text-amac-dark leading-none">
            Challenge Complete!
          </h2>
          <p className="text-neutral-400 font-medium text-sm mt-1.5">{today}</p>
        </div>
      </div>

      {/* Score + streak cards */}
      <div className={`grid gap-3 sm:gap-4 ${streak > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-amac-blue/5 shadow-lg shadow-amac-blue/5 p-6 sm:p-8 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-1">Today&apos;s Score</p>
          <p className="text-5xl sm:text-6xl font-black tracking-tighter text-amac-blue leading-none">
            {score}<span className="text-2xl sm:text-3xl text-neutral-300">/{totalQuestions}</span>
          </p>
          <p className="text-xs sm:text-sm font-medium text-neutral-500 mt-2 leading-snug">
            {getReinforcement(score, totalQuestions)}
          </p>
        </div>

        {streak > 1 && (
          <div className="bg-orange-50 rounded-2xl sm:rounded-3xl border border-orange-200 shadow-lg shadow-orange-100 p-6 sm:p-8 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-400 mb-1">Streak</p>
            <div className="flex items-center justify-center gap-1.5">
              <Flame className="w-7 h-7 sm:w-9 sm:h-9 text-orange-500" />
              <span className="text-5xl sm:text-6xl font-black tracking-tighter text-orange-500 leading-none">
                {streak}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-orange-500 mt-2">days in a row</p>
          </div>
        )}
      </div>

      {/* Rank estimate chip */}
      <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-amac-blue/10 rounded-full w-fit mx-auto shadow-sm">
        <Star className="w-3.5 h-3.5 text-amac-blue" />
        <span className="text-xs font-black text-amac-blue">{getRankEstimate(score, totalQuestions)}</span>
        <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest">(est.)</span>
      </div>

      {/* CTA area */}
      <AnimatePresence mode="wait">
        {scoreSaved ? (
          /* ── Success state ── */
          <motion.div
            key="saved"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center gap-2.5 p-4 bg-green-50 border border-green-200 rounded-2xl">
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
              <span className="text-sm font-black text-green-700">
                Score saved! You&apos;re on the leaderboard.
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              {onPlayPractice && (
                <button
                  onClick={onPlayPractice}
                  className="flex-1 py-3.5 bg-amac-blue text-white rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-amac-blue/90 transition-all active:scale-[0.98]"
                >
                  <Dumbbell className="w-4 h-4" />
                  Practice More
                </button>
              )}
              <button
                onClick={onGoToLobby}
                className="flex-1 py-3.5 bg-amac-gray text-neutral-500 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all active:scale-[0.98]"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </div>
          </motion.div>
        ) : showCapture ? (
          /* ── Capture form ── */
          <motion.div
            key="capture"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-amac-blue/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-xl shadow-amac-blue/5 space-y-5"
          >
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Trophy className="w-4 h-4 text-amac-blue" />
                <h3 className="font-black text-amac-dark text-base sm:text-lg">Save Your Score</h3>
              </div>
              {previewName && (
                <p className="text-sm text-neutral-400 font-medium">
                  Your leaderboard name:{' '}
                  <span className="font-black text-amac-dark">{previewName}</span>
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="John"
                    maxLength={30}
                    required
                    className="w-full px-3.5 py-3 bg-amac-gray border border-amac-blue/10 focus:border-amac-blue/40 rounded-xl outline-none font-bold text-amac-dark text-sm transition-all"
                  />
                </div>
                <div className="w-20">
                  <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1">
                    Last Initial
                  </label>
                  <input
                    type="text"
                    value={lastInitial}
                    onChange={(e) => setLastInitial(e.target.value.charAt(0))}
                    placeholder="D"
                    maxLength={1}
                    required
                    className="w-full px-3.5 py-3 bg-amac-gray border border-amac-blue/10 focus:border-amac-blue/40 rounded-xl outline-none font-bold text-amac-dark text-sm text-center transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-neutral-400 uppercase tracking-widest block mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(formatPhone(e.target.value))}
                  placeholder="(555) 000-0000"
                  required
                  className="w-full px-3.5 py-3 bg-amac-gray border border-amac-blue/10 focus:border-amac-blue/40 rounded-xl outline-none font-bold text-amac-dark text-sm transition-all"
                />
              </div>

              {/* Value props */}
              <ul className="space-y-1.5 pt-1">
                {[
                  'Your score appears on today\'s leaderboard',
                  streak > 1 ? `Your ${streak}-day streak stays protected` : 'Start building your daily streak',
                  'Get a daily text reminder to keep your streak going',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-neutral-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amac-blue shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                type="submit"
                disabled={
                  !firstName.trim() ||
                  !lastInitial.trim() ||
                  phone.replace(/\D/g, '').length < 10 ||
                  saving
                }
                className="w-full py-4 bg-amac-red text-white rounded-xl font-black text-base flex items-center justify-center gap-2 hover:bg-amac-red/90 transition-all disabled:opacity-40 shadow-lg shadow-amac-red/20 active:scale-[0.98]"
              >
                {saving ? 'Saving...' : 'Save My Score'}
                {!saving && <ChevronRight className="w-4 h-4" />}
              </button>
            </form>

            <button
              type="button"
              onClick={() => setShowCapture(false)}
              className="w-full text-center text-xs text-neutral-400 hover:text-neutral-600 font-bold transition-colors pt-1"
            >
              Cancel
            </button>
          </motion.div>
        ) : (
          /* ── Default CTAs ── */
          <motion.div
            key="ctas"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <button
              onClick={() => setShowCapture(true)}
              className="group relative w-full"
            >
              <div className="absolute -inset-0.5 bg-amac-red rounded-2xl blur opacity-20 group-hover:opacity-35 transition duration-500" />
              <div className="relative w-full py-4 sm:py-5 bg-amac-red text-white rounded-xl font-black text-base sm:text-lg flex items-center justify-center gap-2.5 hover:bg-amac-red/90 transition-all shadow-xl shadow-amac-red/20 active:scale-[0.98]">
                <Trophy className="w-5 h-5" />
                Save My Score
              </div>
            </button>

            <div className="flex flex-col sm:flex-row gap-3">
              {onPlayPractice && (
                <button
                  onClick={onPlayPractice}
                  className="flex-1 py-3.5 bg-amac-blue/10 text-amac-blue rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-amac-blue/20 transition-all active:scale-[0.98] border border-amac-blue/10"
                >
                  <Dumbbell className="w-4 h-4" />
                  Practice More
                </button>
              )}
              <button
                onClick={onGoToLobby}
                className="flex-1 py-3.5 bg-amac-gray text-neutral-500 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all active:scale-[0.98]"
              >
                <Home className="w-4 h-4" />
                Home
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-xs text-neutral-400 font-medium">
        Come back tomorrow for a new daily challenge!
      </p>
    </motion.div>
  );
}

// ─── Practice Results Screen ──────────────────────────────────────────────────

function PracticeResults({
  score,
  totalQuestions,
  scoreSaved,
  playerName,
  onSaveScore,
  onRestart,
  onGoToLobby,
}: {
  score: number;
  totalQuestions: number;
  scoreSaved: boolean;
  playerName: string;
  onSaveScore?: (name: string) => Promise<void>;
  onRestart?: () => void;
  onGoToLobby: () => void;
}) {
  const [nameInput, setNameInput] = useState(playerName);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || saving) return;
    setSaving(true);
    await onSaveScore?.(nameInput.trim());
    setSaving(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto text-center space-y-8 sm:space-y-12 py-8 sm:py-12"
    >
      <div className="space-y-4">
        <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl sm:rounded-[2rem] bg-amac-red/10 flex items-center justify-center mx-auto rotate-12">
          <Flag className="w-8 h-8 sm:w-12 sm:h-12 text-amac-red" />
        </div>
        <h2 className="text-4xl sm:text-7xl font-black tracking-tighter uppercase text-amac-dark">
          Game Over
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-amac-blue/5 shadow-xl shadow-amac-blue/5">
          <div className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1 sm:mb-2">
            Final Rank
          </div>
          <div className="text-3xl sm:text-5xl font-black tracking-tighter text-amac-blue leading-tight">
            {getRank(score).name}
          </div>
        </div>
        <div className="bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[2.5rem] border border-amac-blue/5 shadow-xl shadow-amac-blue/5">
          <div className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1 sm:mb-2">
            Score
          </div>
          <div className="text-4xl sm:text-6xl font-black tracking-tighter text-amac-red">
            {score}/{totalQuestions}
          </div>
        </div>
      </div>

      {score > 0 && !scoreSaved && (
        <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-amac-blue/5 shadow-xl shadow-amac-blue/5">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-amac-blue" />
            <span className="text-sm font-black text-amac-blue uppercase tracking-widest">
              Join the Leaderboard
            </span>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
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

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        {onRestart && (
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
          EXIT
        </button>
      </div>
    </motion.div>
  );
}

// ─── Exported Component ───────────────────────────────────────────────────────

export function GameOver({
  score,
  totalQuestions,
  mode,
  onRestart,
  onGoToLobby,
  onPlayPractice,
  onSaveScore,
  onSaveDailyContact,
  scoreSaved,
  playerName = '',
  streak = 0,
}: GameOverProps) {
  if (mode === 'daily') {
    return (
      <DailyResults
        score={score}
        totalQuestions={totalQuestions}
        streak={streak}
        scoreSaved={scoreSaved}
        onSaveDailyContact={onSaveDailyContact}
        onPlayPractice={onPlayPractice}
        onGoToLobby={onGoToLobby}
      />
    );
  }

  return (
    <PracticeResults
      score={score}
      totalQuestions={totalQuestions}
      scoreSaved={scoreSaved}
      playerName={playerName}
      onSaveScore={onSaveScore}
      onRestart={onRestart}
      onGoToLobby={onGoToLobby}
    />
  );
}

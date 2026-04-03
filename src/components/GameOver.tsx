'use client';

import { useState } from 'react';
import { getRank } from '@/lib/constants';
import { QuizMode } from '@/lib/types';
import { track } from '@/lib/analytics';
import {
  type CaptureFormData,
  type CaptureErrors,
  validateCapture,
  hasErrors,
  normalizeFirstName,
  normalizeLastInitial,
  formatPhoneDisplay,
  buildDisplayName,
  SMS_CONSENT_TEXT,
} from '@/lib/capture';
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
  MessageSquare,
} from 'lucide-react';

// ─── Props ────────────────────────────────────────────────────────────────────

interface GameOverProps {
  score: number;
  totalQuestions: number;
  mode: QuizMode;
  onRestart?: () => void;
  onGoToLobby: () => void;
  onPlayPractice?: () => void;
  /** Practice mode — simple name entry */
  onSaveScore?: (name: string) => Promise<void>;
  /** Daily mode — full contact capture */
  onSaveDailyContact?: (
    firstName: string,
    lastInitial: string,
    phone: string,
    smsConsent: boolean
  ) => Promise<void>;
  scoreSaved: boolean;
  playerName?: string;
  streak?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getReinforcement(score: number, total: number): string {
  const pct = score / total;
  if (pct === 1) return 'Perfect. You know your country.';
  if (pct >= 0.8) return 'Strong score — most Americans miss a few of those.';
  if (pct >= 0.6) return 'Above average. Keep showing up and it shows.';
  if (pct >= 0.4) return 'Not bad — come back tomorrow and beat it.';
  return 'Every streak starts somewhere. See you tomorrow.';
}

function getRankEstimate(score: number, total: number): string {
  const pct = score / total;
  if (pct === 1) return "Top 5% today";
  if (pct >= 0.8) return "Top 20% today";
  if (pct >= 0.6) return "Top 45% today";
  if (pct >= 0.4) return "Top 65% today";
  return 'Keep playing to climb the ranks';
}

// ─── Field component ──────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.18em] block">
        {label}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[11px] text-amac-red font-bold"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (hasError: boolean) =>
  `w-full px-4 py-3 bg-amac-gray border rounded-xl outline-none font-bold text-amac-dark text-sm transition-all ` +
  (hasError
    ? 'border-amac-red focus:border-amac-red'
    : 'border-amac-blue/10 focus:border-amac-blue/40');

// ─── Daily Results ────────────────────────────────────────────────────────────

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
  onSaveDailyContact?: (f: string, l: string, p: string, c: boolean) => Promise<void>;
  onPlayPractice?: () => void;
  onGoToLobby: () => void;
}) {
  const [showCapture, setShowCapture] = useState(false);
  const [form, setForm] = useState<CaptureFormData>({
    firstName: '',
    lastInitial: '',
    phone: '',
    smsConsent: false,
  });
  const [errors, setErrors] = useState<CaptureErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  // Update a field and re-validate live after first submission attempt
  const updateField = <K extends keyof CaptureFormData>(key: K, value: CaptureFormData[K]) => {
    const next = { ...form, [key]: value };
    setForm(next);
    if (submitted) setErrors(validateCapture(next));
  };

  const previewName = form.firstName.trim()
    ? buildDisplayName(form.firstName, form.lastInitial || '_')
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const errs = validateCapture(form);
    setErrors(errs);
    if (hasErrors(errs) || saving) return;

    setSaving(true);
    await onSaveDailyContact?.(form.firstName, form.lastInitial, form.phone, form.smsConsent);
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
            Quiz Complete!
          </h2>
          <p className="text-neutral-400 font-medium text-sm mt-1.5">{today}</p>
        </div>
      </div>

      {/* Score + streak */}
      <div className={`grid gap-3 sm:gap-4 ${streak > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-amac-blue/5 shadow-lg shadow-amac-blue/5 p-6 sm:p-8 text-center">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-1">
            Today&apos;s Score
          </p>
          <p className="text-5xl sm:text-6xl font-black tracking-tighter text-amac-blue leading-none">
            {score}
            <span className="text-2xl sm:text-3xl text-neutral-300">/{totalQuestions}</span>
          </p>
          <p className="text-xs sm:text-sm font-medium text-neutral-500 mt-2 leading-snug">
            {getReinforcement(score, totalQuestions)}
          </p>
        </div>

        {streak > 1 && (
          <div className="bg-orange-50 rounded-2xl sm:rounded-3xl border border-orange-200 shadow-lg shadow-orange-100 p-6 sm:p-8 text-center">
            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-orange-400 mb-1">
              Streak
            </p>
            <div className="flex items-center justify-center gap-1.5">
              <Flame className="w-7 h-7 sm:w-9 sm:h-9 text-orange-500" />
              <span className="text-5xl sm:text-6xl font-black tracking-tighter text-orange-500 leading-none">
                {streak}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-medium text-orange-500 mt-2">day streak</p>
          </div>
        )}
      </div>

      {/* Rank chip */}
      <div className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-amac-blue/10 rounded-full w-fit mx-auto shadow-sm">
        <Star className="w-3.5 h-3.5 text-amac-blue" />
        <span className="text-xs font-black text-amac-blue">{getRankEstimate(score, totalQuestions)}</span>
        <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-widest">(est.)</span>
      </div>

      {/* CTA area */}
      <AnimatePresence mode="wait">
        {scoreSaved ? (
          /* ── Success screen ─────────────────────────────────────────────── */
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-amac-blue/5 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-xl shadow-amac-blue/5 text-center space-y-4"
          >
            <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7 text-green-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl sm:text-4xl font-black tracking-tighter text-amac-dark">
                You&apos;re on the board.
              </h3>
              <p className="text-sm sm:text-base font-bold text-neutral-500">
                Score saved. See you tomorrow.
              </p>
              <p className="text-sm sm:text-base font-medium text-neutral-400">
                New quiz drops daily — keep the streak alive.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
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
          /* ── Capture form ────────────────────────────────────────────────── */
          <motion.div
            key="capture"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-amac-blue/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl shadow-amac-blue/5 space-y-5"
          >
            {/* Form header */}
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <Trophy className="w-4 h-4 text-amac-blue" />
                <h3 className="font-black text-amac-dark text-base sm:text-lg">Get on the Leaderboard</h3>
              </div>
              {previewName && (
                <p className="text-sm text-neutral-400 font-medium">
                  Leaderboard name:{' '}
                  <span className="font-black text-amac-dark">{previewName}</span>
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Name row */}
              <div className="flex gap-3">
                <Field label="First Name" error={errors.firstName} >
                  <input
                    type="text"
                    autoComplete="given-name"
                    placeholder="John"
                    maxLength={30}
                    value={form.firstName}
                    onChange={(e) =>
                      updateField('firstName', normalizeFirstName(e.target.value) || e.target.value)
                    }
                    onBlur={(e) =>
                      updateField('firstName', normalizeFirstName(e.target.value))
                    }
                    className={`${inputCls(!!errors.firstName)} flex-1`}
                  />
                </Field>

                <Field label="Last Initial" error={errors.lastInitial}>
                  <input
                    type="text"
                    autoComplete="off"
                    placeholder="S"
                    maxLength={1}
                    value={form.lastInitial}
                    onChange={(e) =>
                      updateField('lastInitial', normalizeLastInitial(e.target.value))
                    }
                    className={`${inputCls(!!errors.lastInitial)} w-16 text-center`}
                  />
                </Field>
              </div>

              {/* Phone */}
              <Field label="Phone Number" error={errors.phone}>
                <input
                  type="tel"
                  autoComplete="tel"
                  placeholder="(555) 000-0000"
                  value={form.phone}
                  onChange={(e) =>
                    updateField('phone', formatPhoneDisplay(e.target.value))
                  }
                  className={inputCls(!!errors.phone)}
                />
              </Field>

              {/* Benefits */}
              <ul className="space-y-1.5 py-1">
                {[
                  "Your name goes on today's national leaderboard",
                  streak > 1
                    ? `Protect your ${streak}-day streak`
                    : 'Start a daily streak — show up tomorrow',
                  "Get a heads-up text when tomorrow's quiz drops",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-neutral-600 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amac-blue shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* SMS consent */}
              <div className="space-y-1">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={form.smsConsent}
                      onChange={(e) => {
                        updateField('smsConsent', e.target.checked);
                        track('sms_consent_checked', {
                          quiz_mode: 'daily',
                          checked: e.target.checked,
                        });
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        form.smsConsent
                          ? 'bg-amac-blue border-amac-blue'
                          : errors.smsConsent
                          ? 'border-amac-red bg-white'
                          : 'border-neutral-300 bg-white group-hover:border-amac-blue/50'
                      }`}
                    >
                      {form.smsConsent && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                          <path
                            d="M2 6l3 3 5-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="text-[11px] text-neutral-500 leading-relaxed font-medium">
                    <MessageSquare className="w-3 h-3 inline-block mr-1 text-amac-blue" />
                    {SMS_CONSENT_TEXT}
                  </span>
                </label>
                <AnimatePresence>
                  {errors.smsConsent && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[11px] text-amac-red font-bold pl-8"
                    >
                      {errors.smsConsent}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={saving}
                className="w-full py-4 bg-amac-red text-white rounded-xl font-black text-base flex items-center justify-center gap-2 hover:bg-amac-red/90 transition-all disabled:opacity-50 shadow-lg shadow-amac-red/20 active:scale-[0.98]"
              >
                {saving ? 'Saving...' : 'Claim My Spot'}
                {!saving && <ChevronRight className="w-4 h-4" />}
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setShowCapture(false);
                setSubmitted(false);
                setErrors({});
              }}
              className="w-full text-center text-xs text-neutral-400 hover:text-neutral-600 font-bold transition-colors"
            >
              Cancel
            </button>
          </motion.div>
        ) : (
          /* ── Default CTAs ──────────────────────────────────────────────── */
          <motion.div
            key="ctas"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <button
              onClick={() => {
                setShowCapture(true);
                track('save_score_clicked', {
                  quiz_mode: 'daily',
                  score,
                  question_count: totalQuestions,
                  streak_count: streak,
                });
              }}
              className="group relative w-full"
            >
              <div className="absolute -inset-0.5 bg-amac-red rounded-2xl blur opacity-20 group-hover:opacity-35 transition duration-500" />
              <div className="relative w-full py-4 sm:py-5 bg-amac-red text-white rounded-xl font-black text-base sm:text-lg flex items-center justify-center gap-2.5 hover:bg-amac-red/90 transition-all shadow-xl shadow-amac-red/20 active:scale-[0.98]">
                <Trophy className="w-5 h-5" />
                Claim My Spot
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
        New quiz every day — same time, different questions.
      </p>
    </motion.div>
  );
}

// ─── Practice Results ─────────────────────────────────────────────────────────

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
              Save Your Score
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
        <div className="text-sm font-bold text-green-600">You&apos;re on the leaderboard.</div>
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

// ─── Exported component ───────────────────────────────────────────────────────

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

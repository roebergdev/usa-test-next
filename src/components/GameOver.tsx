'use client';

import { useState, useEffect } from 'react';
import { getRank } from '@/lib/constants';
import { QuizMode, Question } from '@/lib/types';
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
import {
  getPersonalBest,
  getTodayString,
  type PersonalBest,
} from '@/lib/daily';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flag,
  Play,
  Trophy,
  Home,
  CheckCircle2,
  ChevronRight,
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
  /** Total seconds taken across all questions — used for tiebreaking display */
  totalSeconds?: number | null;
  questions?: Question[];
  userAnswers?: string[];
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

/**
 * Returns a tier label and Tailwind classes based on score.
 *
 * NOTE: These tiers are currently static score-based estimates.
 * To make them real, compute live percentile cutoffs from:
 *   SELECT score, COUNT(*) FROM daily_results WHERE quiz_date = today GROUP BY score
 * and map actual score distributions to tier thresholds.
 */
function getTierInfo(score: number, total: number): { label: string; cls: string } {
  const pct = score / total;
  if (pct === 1) return { label: 'Top 10%', cls: 'text-amber-700 bg-amber-50 border-amber-300' };
  if (pct >= 0.8) return { label: 'Top 25%', cls: 'text-amac-blue bg-amac-blue/8 border-amac-blue/25' };
  if (pct >= 0.6) return { label: 'Top 50%', cls: 'text-green-700 bg-green-50 border-green-300' };
  return { label: 'Completed', cls: 'text-neutral-500 bg-neutral-50 border-neutral-200' };
}

/**
 * Returns a "you beat X% of players" message based on score.
 *
 * NOTE: Static estimates. Replace with a real-time query against daily_results
 * (e.g. what fraction of today's sessions scored < this score) once you have
 * enough daily volume to make the numbers meaningful.
 */
function getPercentileMessage(score: number, total: number): string | null {
  const pct = score / total;
  if (pct === 1) return 'You beat ~90% of players today';
  if (pct >= 0.8) return 'You beat ~72% of players today';
  if (pct >= 0.6) return 'You beat ~47% of players today';
  if (pct >= 0.4) return 'You beat ~28% of players today';
  if (pct >= 0.2) return 'You beat ~13% of players today';
  return null;
}

/**
 * Derives a personal-progress message from today's result vs localStorage history.
 * Returns null when:
 *  - No prior history found (new users)
 *  - Fewer than 3 prior games (avoid discouraging "your best was higher" messaging too early)
 */
function getPersonalBestMessage(
  score: number,
  timeSeconds: number | null,
  pb: PersonalBest | null
): { headline: string; sub?: string } | null {
  if (!pb) return null;

  if (score > pb.bestScore) {
    return {
      headline: 'New personal best!',
      sub: `Up from ${pb.bestScore} — you're improving.`,
    };
  }

  if (score === pb.bestScore) {
    if (
      timeSeconds != null &&
      pb.bestTimeSeconds != null &&
      timeSeconds < pb.bestTimeSeconds
    ) {
      return {
        headline: 'Fastest time yet!',
        sub: `${timeSeconds}s — beat your previous best of ${pb.bestTimeSeconds}s`,
      };
    }
    return {
      headline: 'Matched your best',
      sub: 'Consistent. Keep showing up.',
    };
  }

  // Score is lower than personal best — only show for established players
  if (pb.gamesPlayed >= 3) {
    return {
      headline: `Your best is ${pb.bestScore}/${5}`,
      sub: 'Come back tomorrow to chase it',
    };
  }

  return null;
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
  totalSeconds,
  onSaveDailyContact,
  onPlayPractice,
  onGoToLobby,
  questions = [],
  userAnswers = [],
}: {
  score: number;
  totalQuestions: number;
  streak: number;
  scoreSaved: boolean;
  totalSeconds?: number | null;
  onSaveDailyContact?: (f: string, l: string, p: string, c: boolean) => Promise<void>;
  onPlayPractice?: () => void;
  onGoToLobby: () => void;
  questions?: Question[];
  userAnswers?: string[];
}) {
  const [showCapture, setShowCapture] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [form, setForm] = useState<CaptureFormData>({
    firstName: '',
    lastInitial: '',
    phone: '',
    smsConsent: false,
  });
  const [errors, setErrors] = useState<CaptureErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);

  // Read prior play history from localStorage on first render (client-only).
  // TODO: Once users are authenticated by phone, replace with server-side
  // personal-best data from daily_results WHERE user_id = <current user>.
  const [personalBest] = useState<PersonalBest | null>(() =>
    typeof window !== 'undefined' ? getPersonalBest(getTodayString()) : null
  );

  const tier = getTierInfo(score, totalQuestions);
  const percentileMsg = getPercentileMessage(score, totalQuestions);
  const personalBestMsg = getPersonalBestMessage(score, totalSeconds ?? null, personalBest);

  const [countdown, setCountdown] = useState('');
  useEffect(() => {
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
  }, []);

  // Fire analytics once on mount
  useEffect(() => {
    track('daily_results_viewed', {
      quiz_mode: 'daily',
      score,
      question_count: totalQuestions,
      streak_count: streak,
    });
    if (percentileMsg) {
      track('results_percentile_shown', {
        quiz_mode: 'daily',
        score,
        question_count: totalQuestions,
        percentile_tier: tier.label,
      });
    }
    if (streak >= 1) {
      track('streak_shown', { quiz_mode: 'daily', streak_count: streak });
    }
    if (personalBestMsg) {
      track('personal_best_shown', { quiz_mode: 'daily', score });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <>
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-xl mx-auto space-y-3 sm:space-y-4 py-2 sm:py-4"
    >
      {/* ── Score hero — matches main tile style ── */}
      <div className="bg-white rounded-3xl border-2 border-amac-blue/10 shadow-xl shadow-amac-blue/5 p-7 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base sm:text-lg font-black text-amac-dark/60 tracking-tight mb-1">
              Today&apos;s Score
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-7xl sm:text-8xl font-black tracking-tight text-amac-blue leading-none">
                {score}
              </span>
              <span className="text-3xl sm:text-4xl font-black text-neutral-300 leading-none">
                /{totalQuestions}
              </span>
            </div>
            {totalSeconds != null && (
              <p className="text-sm font-black text-neutral-400 mt-1">{totalSeconds}s</p>
            )}
          </div>
          <span className={`shrink-0 mt-1 px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest ${tier.cls}`}>
            {tier.label}
          </span>
        </div>
        <p className="text-sm sm:text-base font-medium text-neutral-500 mt-4 leading-snug">
          {getReinforcement(score, totalQuestions)}
        </p>
        {percentileMsg && (
          <p className="text-xs font-black text-amac-blue/70 mt-1">{percentileMsg}</p>
        )}
      </div>

      {/* ── Save button (above tiles) or success banner ── */}
      <AnimatePresence mode="wait">
        {scoreSaved ? (
          <motion.div
            key="saved-banner"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl px-4 py-3"
          >
            <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-black text-green-700">Score saved!</p>
              <p className="text-xs font-medium text-green-600">We&apos;ll remind you when tomorrow&apos;s test drops.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="save-btn" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => {
                setShowCapture(true);
                track('save_score_clicked', { quiz_mode: 'daily', score, question_count: totalQuestions, streak_count: streak });
              }}
              className="group relative w-full"
            >
              <div className="absolute -inset-0.5 bg-amac-red rounded-2xl blur opacity-20 group-hover:opacity-35 transition duration-500" />
              <div className="relative w-full py-4 sm:py-5 bg-amac-red text-white rounded-xl font-black text-base sm:text-lg flex items-center justify-center gap-2.5 hover:bg-amac-red/90 transition-all shadow-xl shadow-amac-red/20 active:scale-[0.98]">
                <Trophy className="w-5 h-5" />
                {streak > 1 ? 'Save My Score & Keep My Streak' : 'Save Today\'s Score'}
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Streak + personal best row — matches homepage tile style ── */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border-2 border-amac-blue/10 rounded-2xl p-4 sm:p-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-amac-blue/5 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-xl">🔥</span>
          </div>
          <div>
            <p className="text-base sm:text-lg font-black text-amac-red tracking-tight leading-none">
              {streak > 0 ? `${streak}` : '—'}
            </p>
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mt-0.5">
              {streak > 1 ? 'Day Streak' : streak === 1 ? 'Day 1' : 'No Streak'}
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-amac-blue/10 rounded-2xl p-4 sm:p-5 flex items-center gap-3">
          <div className="w-10 h-10 bg-amac-blue/5 rounded-xl flex items-center justify-center shrink-0">
            <span className="text-xl">📈</span>
          </div>
          <div>
            {personalBestMsg ? (
              <>
                <p className="text-sm font-black text-green-600 leading-tight">{personalBestMsg.headline}</p>
                {personalBestMsg.sub && (
                  <p className="text-[10px] font-medium text-neutral-400 mt-0.5 leading-snug">{personalBestMsg.sub}</p>
                )}
              </>
            ) : (
              <>
                <p className="text-base sm:text-lg font-black text-amac-dark tracking-tight leading-none">Progress</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400 mt-0.5">Keep showing up</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Secondary actions ── */}
      <div className="flex gap-3">
        <button
          onClick={() => setShowResults(true)}
          className="flex-1 py-3.5 bg-amac-blue/10 text-amac-blue rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-amac-blue/20 transition-all active:scale-[0.98] border border-amac-blue/10"
        >
          <span>📋</span>
          View Results
        </button>
        {onPlayPractice && (
          <button
            onClick={onPlayPractice}
            className="flex-1 py-3.5 bg-amac-blue/10 text-amac-blue rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-amac-blue/20 transition-all active:scale-[0.98] border border-amac-blue/10"
          >
            <span>🧠</span>
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

      {!scoreSaved && (
        <button
          onClick={() => { track('leaderboard_preview_shown', { quiz_mode: 'daily', score }); onGoToLobby(); }}
          className="w-full text-center text-xs text-neutral-400 hover:text-amac-blue font-bold transition-colors pt-1"
        >
          View today&apos;s leaderboard →
        </button>
      )}

      <div className="text-center space-y-1 pb-2">
        <p className="text-3xl font-black text-amac-dark tabular-nums tracking-tight">{countdown}</p>
        <p className="text-xs font-black text-neutral-400 uppercase tracking-widest">
          until next test &mdash; same time, different questions
        </p>
      </div>
    </motion.div>

    {/* ── Bottom sheet capture form ── */}
    <AnimatePresence>
      {showCapture && !scoreSaved && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => { setShowCapture(false); setSubmitted(false); setErrors({}); }}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-neutral-200 rounded-full" />
            </div>

            <div className="p-5 sm:p-8 space-y-5 pb-8">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <Trophy className="w-4 h-4 text-amac-blue" />
                  <h3 className="font-black text-amac-dark text-base sm:text-lg">Save Your Progress</h3>
                </div>
                {previewName && (
                  <p className="text-sm text-neutral-400 font-medium">
                    Saved as: <span className="font-black text-amac-dark">{previewName}</span>
                  </p>
                )}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="flex gap-3">
                  <Field label="First Name" error={errors.firstName}>
                    <input
                      type="text"
                      autoComplete="given-name"
                      placeholder="John"
                      maxLength={30}
                      value={form.firstName}
                      onChange={(e) =>
                        updateField('firstName', normalizeFirstName(e.target.value) || e.target.value)
                      }
                      onBlur={(e) => updateField('firstName', normalizeFirstName(e.target.value))}
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

                <Field label="Phone Number" error={errors.phone}>
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="(555) 000-0000"
                    value={form.phone}
                    onChange={(e) => updateField('phone', formatPhoneDisplay(e.target.value))}
                    className={inputCls(!!errors.phone)}
                  />
                </Field>

                <ul className="space-y-1.5 py-1">
                  {[
                    'Your score is saved and tracked over time',
                    streak > 1 ? `Protect your ${streak}-day streak` : 'Start tracking your daily streak',
                    'Get occasional heads-ups when quizzes drop',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-neutral-600 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amac-blue shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="space-y-1">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        checked={form.smsConsent}
                        onChange={(e) => {
                          updateField('smsConsent', e.target.checked);
                          track('sms_consent_checked', { quiz_mode: 'daily', checked: e.target.checked });
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
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full py-4 bg-amac-red text-white rounded-xl font-black text-base flex items-center justify-center gap-2 hover:bg-amac-red/90 transition-all disabled:opacity-50 shadow-lg shadow-amac-red/20 active:scale-[0.98]"
                >
                  {saving ? 'Saving...' : 'Save My Score'}
                  {!saving && <ChevronRight className="w-4 h-4" />}
                </button>
              </form>

              <button
                type="button"
                onClick={() => { setShowCapture(false); setSubmitted(false); setErrors({}); }}
                className="w-full text-center text-xs text-neutral-400 hover:text-neutral-600 font-bold transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>

    {/* ── Bottom sheet: results review ── */}
    <AnimatePresence>
      {showResults && (
        <>
          <motion.div
            key="results-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowResults(false)}
          />
          <motion.div
            key="results-sheet"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 bg-neutral-200 rounded-full" />
            </div>
            <div className="p-5 sm:p-8 pb-10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-black text-amac-dark text-lg">Today&apos;s Results</h3>
                <span className="text-sm font-black text-amac-blue">{score}/{totalQuestions}</span>
              </div>
              {questions.length === 0 ? (
                <p className="text-sm text-neutral-400 font-medium text-center py-8">Results not available.</p>
              ) : (
                <div className="space-y-3">
                  {questions.map((q, i) => {
                    const userAnswer = userAnswers[i];
                    const timedOut = userAnswer === '';
                    const correct = userAnswer === q.correctAnswer;
                    return (
                      <div
                        key={q.id}
                        className={`rounded-2xl border p-4 space-y-2 ${
                          correct ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className={`text-xs font-black shrink-0 mt-0.5 ${correct ? 'text-green-600' : 'text-red-500'}`}>
                            {correct ? '✓' : '✗'}
                          </span>
                          <p className="text-sm font-black text-amac-dark leading-snug">{q.text}</p>
                        </div>
                        {!correct && (
                          <div className="pl-4 space-y-1">
                            <p className="text-xs font-medium text-red-500">
                              Your answer: <span className="font-black">{timedOut ? "Time's up" : userAnswer || '—'}</span>
                            </p>
                            <p className="text-xs font-medium text-green-700">
                              Correct: <span className="font-black">{q.correctAnswer}</span>
                            </p>
                          </div>
                        )}
                        {correct && (
                          <p className="pl-4 text-xs font-black text-green-700">{q.correctAnswer}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              <button
                onClick={() => setShowResults(false)}
                className="w-full py-3.5 bg-amac-gray text-neutral-500 rounded-xl font-black text-sm hover:bg-neutral-200 transition-all mt-2"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    </>
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
  totalSeconds,
  questions,
  userAnswers,
}: GameOverProps) {
  if (mode === 'daily') {
    return (
      <DailyResults
        score={score}
        totalQuestions={totalQuestions}
        streak={streak}
        totalSeconds={totalSeconds}
        scoreSaved={scoreSaved}
        onSaveDailyContact={onSaveDailyContact}
        onPlayPractice={onPlayPractice}
        onGoToLobby={onGoToLobby}
        questions={questions}
        userAnswers={userAnswers}
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

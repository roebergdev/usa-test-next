import { Question } from './types';
import { PREDEFINED_QUESTIONS } from '@/data/questions';

export const DAILY_STORAGE_PREFIX = 'usa_test_daily_';
export const SCORE_SAVED_PREFIX = 'usa_test_score_saved_';

// Difficulty curve for the 5-question daily quiz:
// Q1-2: easy (1, 2), Q3-4: medium (4, 5), Q5: hard (7)
const DAILY_DIFFICULTIES = [1, 2, 4, 5, 7] as const;

export function getTodayString(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function dateStringToSeed(dateStr: string): number {
  return parseInt(dateStr.replace(/-/g, ''), 10);
}

// Mulberry32 seeded PRNG — deterministic, fast, good distribution
function createSeededRng(seed: number): () => number {
  let s = seed;
  return function () {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fisherYates<T>(arr: T[], rng: () => number): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Returns the same 5 questions for every user on a given calendar day.
 * Deterministic: seeded by today's date string.
 */
export function getDailyQuestions(): Question[] {
  const seed = dateStringToSeed(getTodayString());
  const rng = createSeededRng(seed);

  const questions: Question[] = [];
  for (const diff of DAILY_DIFFICULTIES) {
    const pool = PREDEFINED_QUESTIONS.filter((q) => q.difficulty === diff);
    if (pool.length === 0) continue;
    const shuffled = fisherYates(pool, rng);
    questions.push(shuffled[0]);
  }

  return questions;
}

export interface DailyResult {
  date: string;
  score: number;
  totalQuestions: number;
  timeSeconds?: number;
}

export function getDailyResult(): DailyResult | null {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem(DAILY_STORAGE_PREFIX + getTodayString());
  if (!stored) return null;
  try {
    return JSON.parse(stored) as DailyResult;
  } catch {
    return null;
  }
}

export function saveDailyResultLocal(score: number, totalQuestions: number, timeSeconds?: number): void {
  if (typeof window === 'undefined') return;
  const result: DailyResult = { date: getTodayString(), score, totalQuestions, timeSeconds };
  localStorage.setItem(DAILY_STORAGE_PREFIX + getTodayString(), JSON.stringify(result));
}

export function hasPlayedToday(): boolean {
  return getDailyResult() !== null;
}

export function getStreak(): number {
  if (typeof window === 'undefined') return 0;

  const today = getTodayString();
  if (!localStorage.getItem(DAILY_STORAGE_PREFIX + today)) return 0;

  let streak = 1;
  const base = new Date();

  for (let i = 1; i <= 365; i++) {
    const d = new Date(base);
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const key = `${DAILY_STORAGE_PREFIX}${y}-${m}-${day}`;
    if (localStorage.getItem(key)) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Returns the streak count as of yesterday, regardless of whether
 * the user has played today. Used to surface "at-risk" streak warnings.
 */
export function getYesterdayStreak(): number {
  if (typeof window === 'undefined') return 0;

  const base = new Date();
  base.setDate(base.getDate() - 1);
  const y = base.getFullYear();
  const m = String(base.getMonth() + 1).padStart(2, '0');
  const d = String(base.getDate()).padStart(2, '0');
  const yesterdayKey = `${DAILY_STORAGE_PREFIX}${y}-${m}-${d}`;

  if (!localStorage.getItem(yesterdayKey)) return 0;

  let streak = 1;
  for (let i = 1; i <= 365; i++) {
    const date = new Date(base);
    date.setDate(date.getDate() - i);
    const dy = date.getFullYear();
    const dm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const key = `${DAILY_STORAGE_PREFIX}${dy}-${dm}-${dd}`;
    if (localStorage.getItem(key)) streak++;
    else break;
  }
  return streak;
}

/** Returns true if the user saved their named score to the leaderboard today. Persists across reloads. */
export function hasSavedScore(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(SCORE_SAVED_PREFIX + getTodayString()) === '1';
}

/** Called after a successful leaderboard save so the flag survives page reloads. */
export function markScoreSaved(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SCORE_SAVED_PREFIX + getTodayString(), '1');
}

const USER_DISPLAY_NAME_KEY = 'usa_test_display_name';

/** Persists the user's display name after a successful identity capture. */
export function saveUserDisplayName(displayName: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_DISPLAY_NAME_KEY, displayName);
}

/** Returns the saved display name, or empty string if none. */
export function getUserDisplayName(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(USER_DISPLAY_NAME_KEY) ?? '';
}

export interface PersonalBest {
  bestScore: number;
  bestTimeSeconds: number | null;
  gamesPlayed: number;
}

/**
 * Scans the last 60 days of localStorage (excluding today) and returns the
 * user's personal best score and fastest completion time.
 * Returns null when no prior play history is found.
 *
 * TODO: Once users are authenticated by phone, replace with a server-side
 * query against daily_results WHERE user_id = <current user> to get accurate
 * cross-device history.
 */
export function getPersonalBest(todayDate: string): PersonalBest | null {
  if (typeof window === 'undefined') return null;

  let bestScore = -1;
  let bestTimeSeconds: number | null = null;
  let gamesPlayed = 0;

  for (let i = 1; i <= 60; i++) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const y = d.getFullYear();
    const mo = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const dateStr = `${y}-${mo}-${day}`;
    if (dateStr === todayDate) continue;

    const stored = localStorage.getItem(DAILY_STORAGE_PREFIX + dateStr);
    if (!stored) continue;

    try {
      const result = JSON.parse(stored) as DailyResult;
      gamesPlayed++;
      if (result.score > bestScore) {
        bestScore = result.score;
        bestTimeSeconds = result.timeSeconds ?? null;
      } else if (result.score === bestScore && result.timeSeconds != null) {
        if (bestTimeSeconds === null || result.timeSeconds < bestTimeSeconds) {
          bestTimeSeconds = result.timeSeconds;
        }
      }
    } catch {
      // ignore corrupt entries
    }
  }

  return gamesPlayed === 0 ? null : { bestScore, bestTimeSeconds, gamesPlayed };
}

// Session identity is now managed server-side via an HTTP-only cookie
// (set by middleware.ts) and exposed to the client through GET /api/session.
// The old localStorage-based getOrCreateSessionId() has been removed.

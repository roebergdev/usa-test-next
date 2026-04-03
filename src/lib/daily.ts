import { Question } from './types';
import { PREDEFINED_QUESTIONS } from '@/data/questions';

export const DAILY_STORAGE_PREFIX = 'usa_test_daily_';
export const SESSION_ID_KEY = 'usa_test_session_id';

// Difficulties sampled for the daily quiz (5 questions, spread across the spectrum)
const DAILY_DIFFICULTIES = [2, 4, 6, 8, 10] as const;

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

export function saveDailyResultLocal(score: number, totalQuestions: number): void {
  if (typeof window === 'undefined') return;
  const result: DailyResult = { date: getTodayString(), score, totalQuestions };
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

export function getOrCreateSessionId(): string {
  if (typeof window === 'undefined') return '';
  let id = localStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { Question } from '@/lib/types';

// Difficulty slots for the 5-question daily quiz — all easy
const DAILY_DIFFICULTIES = [1, 1, 1, 1, 1] as const;

function getTodayString(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/New_York' });
}

function dateStringToSeed(dateStr: string): number {
  const secret = process.env.DAILY_SEED_SECRET ?? '';
  const combined = dateStr + secret;
  let hash = 0;
  for (let i = 0; i < combined.length; i++) {
    hash = (Math.imul(31, hash) + combined.charCodeAt(i)) | 0;
  }
  return hash >>> 0;
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
 * GET /api/daily-questions
 *
 * Returns the same 5 questions for every user on a given calendar day.
 * Questions are pulled from the Supabase `questions` table and selected
 * deterministically using a date-seeded PRNG with all easy (difficulty 1) slots.
 *
 * If a difficulty slot has no questions, it falls back to any remaining
 * unselected questions from the full pool.
 */
export async function GET() {
  const today = getTodayString();
  const seed = dateStringToSeed(today);
  const rng = createSeededRng(seed);

  const { data, error } = await supabaseAdmin
    .from('questions')
    .select('id, text, options, correct_answer, category, difficulty, explanation');

  if (error) {
    console.error('[api/daily-questions] Failed to fetch questions:', error.message);
    return NextResponse.json({ error: 'Failed to load questions' }, { status: 500 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ error: 'No questions in database' }, { status: 404 });
  }

  // Map DB rows to the Question shape the client expects
  const allQuestions: Question[] = data.map((row) => ({
    id: row.id,
    text: row.text,
    options: row.options,
    correctAnswer: row.correct_answer,
    category: row.category,
    difficulty: row.difficulty,
    ...(row.explanation ? { explanation: row.explanation } : {}),
  }));

  // Shuffle the full pool once with the seeded RNG so fallback picks are also deterministic
  const shuffledAll = fisherYates(allQuestions, rng);

  const selected: Question[] = [];
  const usedIds = new Set<string>();

  // Try to fill each difficulty slot
  for (const diff of DAILY_DIFFICULTIES) {
    const pool = shuffledAll.filter((q) => q.difficulty === diff && !usedIds.has(q.id));
    if (pool.length > 0) {
      selected.push(pool[0]);
      usedIds.add(pool[0].id);
    }
  }

  // If any slots were empty, fill from remaining questions
  if (selected.length < 5) {
    for (const q of shuffledAll) {
      if (selected.length >= 5) break;
      if (!usedIds.has(q.id)) {
        selected.push(q);
        usedIds.add(q.id);
      }
    }
  }

  return NextResponse.json({ questions: selected, date: today });
}

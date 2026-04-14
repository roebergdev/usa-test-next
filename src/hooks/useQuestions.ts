'use client';

import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { Question } from '@/lib/types';
import { PREDEFINED_QUESTIONS } from '@/data/questions';

const SEEN_KEY = 'usa_test_seen_ids';
const MAX_SEEN = 500; // rotate after 500 questions so pool never fully exhausts

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getSeenIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(SEEN_KEY) || '[]');
  } catch {
    return [];
  }
}

export function addSeenIds(ids: string[]) {
  try {
    const current = getSeenIds();
    const merged = [...new Set([...current, ...ids])];
    // Keep the most recent MAX_SEEN to avoid exhausting the pool forever
    localStorage.setItem(SEEN_KEY, JSON.stringify(merged.slice(-MAX_SEEN)));
  } catch {}
}

export function useQuestions() {
  const { supabase } = useSupabaseContext();

  const fetchQuestionsByRange = async (
    minDifficulty: number,
    maxDifficulty: number,
    count: number,
    excludeIds: string[],
    category?: string | null
  ): Promise<Question[]> => {
    try {
      const { data, error } = await supabase.rpc('get_random_questions_range', {
        p_min_difficulty: minDifficulty,
        p_max_difficulty: maxDifficulty,
        p_count: count,
        p_category: category ?? null,
        p_exclude_ids: excludeIds,
      });

      if (error) throw error;

      return (data || []).map((q: { id: string; text: string; options: string[]; correct_answer: string; difficulty: number; category: string; explanation?: string }) => ({
        id: q.id,
        text: q.text,
        options: q.options,
        correctAnswer: q.correct_answer,
        difficulty: q.difficulty,
        category: q.category,
        ...(q.explanation ? { explanation: q.explanation } : {}),
      })) as Question[];
    } catch (error) {
      console.error('Error fetching questions:', error);
      return shuffleArray(
        PREDEFINED_QUESTIONS.filter(
          (q) =>
            q.difficulty >= minDifficulty &&
            q.difficulty <= maxDifficulty &&
            (!category || q.category === category) &&
            !excludeIds.includes(q.id)
        )
      ).slice(0, count);
    }
  };

  // kept for daily-questions compatibility
  const fetchQuestions = async (
    difficulty: number,
    count: number = 1,
    excludeQuestions: string[] = [],
    category?: string | null
  ): Promise<Question[]> => {
    return fetchQuestionsByRange(difficulty, difficulty, count, excludeQuestions, category);
  };

  const generateQuestions = async (
    difficulty: number,
    count: number = 1,
    excludeQuestions: string[] = [],
    category?: string | null
  ): Promise<Question[]> => {
    try {
      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty, count, excludeQuestions, category }),
      });
      if (!res.ok) throw new Error('Failed to generate questions');
      return await res.json();
    } catch (error) {
      console.error('Failed to generate questions:', error);
      return shuffleArray(
        PREDEFINED_QUESTIONS.filter(
          (q) =>
            q.difficulty === difficulty &&
            (!category || q.category === category) &&
            !excludeQuestions.includes(q.text)
        )
      ).slice(0, count);
    }
  };

  return { fetchQuestions, fetchQuestionsByRange, generateQuestions };
}

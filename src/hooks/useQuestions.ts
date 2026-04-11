'use client';

import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { Question } from '@/lib/types';
import { PREDEFINED_QUESTIONS } from '@/data/questions';

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useQuestions() {
  const { supabase } = useSupabaseContext();

  const fetchQuestions = async (
    difficulty: number,
    count: number = 1,
    excludeQuestions: string[] = [],
    category?: string | null
  ): Promise<Question[]> => {
    try {
      const { data } = await supabase.rpc('get_random_questions', {
        p_difficulty: difficulty,
        p_count: count,
        p_category: category ?? null,
        p_exclude: excludeQuestions,
      });

      const allQuestions = (data || []).map((q: { id: string; text: string; options: string[]; correct_answer: string; difficulty: number; category: string }) => ({
        id: q.id,
        text: q.text,
        options: q.options,
        correctAnswer: q.correct_answer,
        difficulty: q.difficulty,
        category: q.category,
      })) as Question[];

      if (allQuestions.length < count) {
        const localFallback = PREDEFINED_QUESTIONS.filter(
          (q) =>
            q.difficulty === difficulty &&
            (!category || q.category === category) &&
            !excludeQuestions.includes(q.text)
        );
        const combined = [...allQuestions, ...localFallback];
        return shuffleArray(combined).slice(0, count);
      }

      return allQuestions;
    } catch (error) {
      console.error('Error fetching questions:', error);
      const localFallback = PREDEFINED_QUESTIONS.filter(
        (q) =>
          q.difficulty === difficulty &&
          (!category || q.category === category) &&
          !excludeQuestions.includes(q.text)
      );
      return shuffleArray(localFallback).slice(0, count);
    }
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
      const localFallback = PREDEFINED_QUESTIONS.filter(
        (q) =>
          q.difficulty === difficulty &&
          (!category || q.category === category) &&
          !excludeQuestions.includes(q.text)
      );
      return shuffleArray(localFallback).slice(0, count);
    }
  };

  return { fetchQuestions, generateQuestions };
}

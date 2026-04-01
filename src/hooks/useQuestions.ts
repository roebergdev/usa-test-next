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
    excludeQuestions: string[] = []
  ): Promise<Question[]> => {
    try {
      const { data } = await supabase
        .from('questions')
        .select('*')
        .eq('difficulty', difficulty)
        .limit(20);

      const allQuestions = (data || []).map((q) => ({
        id: q.id,
        text: q.text,
        options: q.options,
        correctAnswer: q.correct_answer,
        difficulty: q.difficulty,
        category: q.category,
      })) as Question[];

      const filtered = allQuestions.filter(
        (q) => !excludeQuestions.includes(q.text)
      );

      if (filtered.length < count) {
        const localFallback = PREDEFINED_QUESTIONS.filter(
          (q) =>
            q.difficulty === difficulty &&
            !excludeQuestions.includes(q.text)
        );
        const combined = [...filtered, ...localFallback];
        return shuffleArray(combined).slice(0, count);
      }

      return shuffleArray(filtered).slice(0, count);
    } catch (error) {
      console.error('Error fetching questions:', error);
      const localFallback = PREDEFINED_QUESTIONS.filter(
        (q) =>
          q.difficulty === difficulty &&
          !excludeQuestions.includes(q.text)
      );
      return shuffleArray(localFallback).slice(0, count);
    }
  };

  const generateQuestions = async (
    difficulty: number,
    count: number = 1,
    excludeQuestions: string[] = []
  ): Promise<Question[]> => {
    try {
      const res = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty, count, excludeQuestions }),
      });
      if (!res.ok) throw new Error('Failed to generate questions');
      return await res.json();
    } catch (error) {
      console.error('Failed to generate questions:', error);
      const localFallback = PREDEFINED_QUESTIONS.filter(
        (q) =>
          q.difficulty === difficulty &&
          !excludeQuestions.includes(q.text)
      );
      return shuffleArray(localFallback).slice(0, count);
    }
  };

  return { fetchQuestions, generateQuestions };
}

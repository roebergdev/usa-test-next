'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { useQuestions } from '@/hooks/useQuestions';
import { Question } from '@/lib/types';
import { TIMER_SECONDS, TOTAL_QUESTIONS } from '@/lib/constants';
import { getUserDisplayName } from '@/lib/daily';
import { track } from '@/lib/analytics';

export function useGame(category?: string | null) {
  const { supabase } = useSupabaseContext();
  const { fetchQuestions, generateQuestions } = useQuestions();

  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'gameOver'>('lobby');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);

  const gameStateRef = useRef(gameState);
  const currentQuestionIndexRef = useRef(currentQuestionIndex);
  const questionsRef = useRef(questions);
  const userAnswersRef = useRef(userAnswers);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { currentQuestionIndexRef.current = currentQuestionIndex; }, [currentQuestionIndex]);
  useEffect(() => { questionsRef.current = questions; }, [questions]);
  useEffect(() => { userAnswersRef.current = userAnswers; }, [userAnswers]);

  // Timer logic
  useEffect(() => {
    if (gameState !== 'playing' || selectedAnswer !== null) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    setUserAnswers((prev) => [...prev, '']);
    setSelectedAnswer('');
    setIsCorrect(false);
    playSound(false);
  }, [timeLeft, gameState, selectedAnswer, currentQuestionIndex]);

  const playSound = (correct: boolean) => {
    const audio = new Audio(
      correct
        ? 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'
        : 'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3'
    );
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  const advance = useCallback(() => {
    const idx = currentQuestionIndexRef.current;
    const total = questionsRef.current.length;

    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    setSelectedAnswer(null);
    setIsCorrect(null);

    if (idx + 1 < total) {
      setCurrentQuestionIndex(idx + 1);
      setTimeLeft(TIMER_SECONDS);
    } else {
      setGameState('gameOver');
    }
  }, []);

  const saveScoreWithName = async (name: string) => {
    if (scoreSaved || score === 0) return;
    const { error } = await supabase.from('leaderboard').insert({
      display_name: name,
      score,
      mode: 'practice',
    });
    if (error) {
      console.error('Failed to save score:', error.message, error.details, error.hint);
    } else {
      setScoreSaved(true);
    }
  };

  const startGame = async () => {
    setLoading(true);
    setScore(0);
    setScoreSaved(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setUserAnswers([]);

    try {
      // Fetch candidate pools for each difficulty bucket in parallel
      // Easy: difficulties 1-2 (5 questions), Medium: 3-5 (3 questions), Hard: 6-10 (2 questions)
      const [easyResults, mediumResults, hardResults] = await Promise.all([
        Promise.all([1, 2].map((d) => fetchQuestions(d, 4, [], category))),
        Promise.all([3, 4, 5].map((d) => fetchQuestions(d, 3, [], category))),
        Promise.all([6, 7, 8, 9, 10].map((d) => fetchQuestions(d, 2, [], category))),
      ]);

      const shuffle = <T>(arr: T[]): T[] => {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };

      const pickUnique = (pool: Question[], count: number, asked: string[]): Question[] => {
        const picked: Question[] = [];
        for (const q of pool) {
          if (picked.length >= count) break;
          if (!asked.includes(q.text)) {
            picked.push(q);
            asked.push(q.text);
          }
        }
        return picked;
      };

      const allQuestions: Question[] = [];
      const asked: string[] = [];

      const buckets: [Question[], number][] = [
        [shuffle(easyResults.flat()), 5],
        [shuffle(mediumResults.flat()), 3],
        [shuffle(hardResults.flat()), 2],
      ];

      for (const [pool, count] of buckets) {
        allQuestions.push(...pickUnique(pool, count, asked));
      }

      if (allQuestions.length === 0) {
        throw new Error('Could not load questions. Please try again.');
      }

      setQuestions(allQuestions);
      setGameState('playing');
      setTimeLeft(TIMER_SECONDS);

      track('practice_mode_started', {
        quiz_mode: 'practice',
        question_count: allQuestions.length,
        question_category: category ?? 'All Categories',
      });
    } catch (err) {
      console.error('Failed to start game:', err);
      alert(err instanceof Error ? err.message : 'Failed to start game.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    if (gameStateRef.current !== 'playing' || selectedAnswer !== null) return;

    const currentQ = questionsRef.current[currentQuestionIndexRef.current];
    if (!currentQ) return;

    const correct = answer === currentQ.correctAnswer;
    setUserAnswers((prev) => [...prev, answer]);
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    playSound(correct);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const continueToNext = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    advance();
  }, [advance]);

  return {
    gameState,
    questions,
    currentQuestionIndex,
    score,
    scoreSaved,
    difficulty: questions[currentQuestionIndex]?.difficulty ?? 1,
    loading,
    selectedAnswer,
    isCorrect,
    timeLeft,
    totalQuestions: questions.length,
    playerName: getUserDisplayName(),
    userAnswers,
    startGame,
    handleAnswer,
    continueToNext,
    saveScoreWithName,
  };
}

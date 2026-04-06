'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { useQuestions } from '@/hooks/useQuestions';
import { Question } from '@/lib/types';
import { TIMER_SECONDS, TOTAL_QUESTIONS } from '@/lib/constants';
import { getUserDisplayName } from '@/lib/daily';
import { track } from '@/lib/analytics';

export function useGame() {
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

  const gameStateRef = useRef(gameState);
  const currentQuestionIndexRef = useRef(currentQuestionIndex);
  const questionsRef = useRef(questions);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { currentQuestionIndexRef.current = currentQuestionIndex; }, [currentQuestionIndex]);
  useEffect(() => { questionsRef.current = questions; }, [questions]);

  // Timer logic
  useEffect(() => {
    if (gameState !== 'playing' || selectedAnswer !== null) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

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

    try {
      const results = await Promise.all(
        Array.from({ length: TOTAL_QUESTIONS }, (_, i) => fetchQuestions(i + 1, 5, []))
      );

      const allQuestions: Question[] = [];
      const asked: string[] = [];

      for (let i = 0; i < TOTAL_QUESTIONS; i++) {
        let pool = results[i].filter((q) => !asked.includes(q.text));
        if (pool.length === 0) {
          const generated = await generateQuestions(i + 1, 1, asked);
          pool = generated;
        }
        if (pool.length > 0) {
          allQuestions.push(pool[0]);
          asked.push(pool[0].text);
        }
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
    startGame,
    handleAnswer,
    continueToNext,
    saveScoreWithName,
  };
}

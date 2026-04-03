'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { Question } from '@/lib/types';
import { TIMER_SECONDS } from '@/lib/constants';
import {
  getDailyQuestions,
  getDailyResult,
  saveDailyResultLocal,
  hasPlayedToday,
  getStreak,
  getOrCreateSessionId,
  getTodayString,
  type DailyResult,
} from '@/lib/daily';

export function useDailyGame() {
  const { supabase } = useSupabaseContext();

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [alreadyPlayed, setAlreadyPlayed] = useState<DailyResult | null>(null);
  const [streak, setStreak] = useState(0);

  // Refs to prevent stale closures in setTimeout callbacks
  const gameStateRef = useRef(gameState);
  const currentQuestionIndexRef = useRef(currentQuestionIndex);
  const questionsRef = useRef(questions);
  const scoreRef = useRef(score);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { currentQuestionIndexRef.current = currentQuestionIndex; }, [currentQuestionIndex]);
  useEffect(() => { questionsRef.current = questions; }, [questions]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  // Check for existing daily play on mount
  useEffect(() => {
    const result = getDailyResult();
    if (result) {
      setAlreadyPlayed(result);
      setStreak(getStreak());
    }
  }, []);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || selectedAnswer !== null) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
      return () => clearTimeout(timer);
    }

    // Time's up — show wrong answer state; user must click Continue
    setSelectedAnswer('');
    setIsCorrect(false);
    playSound(false);
  }, [timeLeft, gameState, selectedAnswer]);

  const playSound = (correct: boolean) => {
    const audio = new Audio(
      correct
        ? 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'
        : 'https://assets.mixkit.co/active_storage/sfx/2001/2001-preview.mp3'
    );
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  const persistResult = useCallback(
    (finalScore: number, totalQuestions: number) => {
      saveDailyResultLocal(finalScore, totalQuestions);
      setAlreadyPlayed({ date: getTodayString(), score: finalScore, totalQuestions });
      setStreak(getStreak());
      supabase
        .from('daily_results')
        .insert({
          quiz_date: getTodayString(),
          session_id: getOrCreateSessionId(),
          score: finalScore,
          total_questions: totalQuestions,
        })
        .then(() => {});
    },
    [supabase]
  );

  // Explicit score param avoids relying on stale refs after setScore
  const advanceOrEnd = useCallback(
    (currentScore: number) => {
      const idx = currentQuestionIndexRef.current;
      const total = questionsRef.current.length;

      setSelectedAnswer(null);
      setIsCorrect(null);

      if (idx + 1 < total) {
        setCurrentQuestionIndex(idx + 1);
        setTimeLeft(TIMER_SECONDS);
      } else {
        setGameState('gameOver');
        persistResult(currentScore, total);
      }
    },
    [persistResult]
  );

  const startGame = () => {
    if (hasPlayedToday()) return;
    const qs = getDailyQuestions();
    setQuestions(qs);
    setCurrentQuestionIndex(0);
    setScore(0);
    setScoreSaved(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTimeLeft(TIMER_SECONDS);
    setGameState('playing');
  };

  const handleAnswer = (answer: string) => {
    if (gameStateRef.current !== 'playing' || selectedAnswer !== null) return;
    const currentQ = questionsRef.current[currentQuestionIndexRef.current];
    if (!currentQ) return;

    const correct = answer === currentQ.correctAnswer;
    const newScore = scoreRef.current + (correct ? 1 : 0);

    setSelectedAnswer(answer);
    setIsCorrect(correct);
    playSound(correct);
    if (correct) setScore(newScore);
    // User must click Continue to advance
  };

  const continueToNext = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    advanceOrEnd(scoreRef.current);
  }, [advanceOrEnd]);

  const saveScoreWithName = async (name: string) => {
    if (scoreSaved) return;
    const { error } = await supabase.from('leaderboard').insert({
      display_name: name,
      score,
      mode: 'daily',
    });
    if (!error) {
      setScoreSaved(true);
    } else {
      console.error('Failed to save daily score:', error.message);
    }
  };

  return {
    gameState,
    questions,
    currentQuestionIndex,
    score,
    scoreSaved,
    selectedAnswer,
    isCorrect,
    timeLeft,
    totalQuestions: questions.length,
    alreadyPlayed,
    streak,
    startGame,
    handleAnswer,
    continueToNext,
    saveScoreWithName,
  };
}

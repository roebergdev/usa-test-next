'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { Question } from '@/lib/types';
import { TIMER_SECONDS } from '@/lib/constants';
import {
  getDailyResult,
  saveDailyResultLocal,
  hasPlayedToday,
  hasSavedScore,
  markScoreSaved,
  saveUserDisplayName,
  getStreak,
  getTodayString,
  type DailyResult,
} from '@/lib/daily';
import { track } from '@/lib/analytics';

export function useDailyGame() {
  const { supabase } = useSupabaseContext();

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [alreadyPlayed, setAlreadyPlayed] = useState<DailyResult | null>(null);
  const [streak, setStreak] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  // Total seconds taken across all questions — used for leaderboard tiebreaking.
  const [totalSeconds, setTotalSeconds] = useState<number | null>(null);

  // Refs to prevent stale closures in setTimeout callbacks
  const gameStateRef = useRef(gameState);
  const currentQuestionIndexRef = useRef(currentQuestionIndex);
  const questionsRef = useRef(questions);
  const scoreRef = useRef(score);
  const timeLeftRef = useRef(timeLeft);

  // Accumulates seconds used per question. Summed in persistResult.
  const questionTimesRef = useRef<number[]>([]);
  const userAnswersRef = useRef<string[]>(userAnswers);

  // Holds the session_id returned by /api/session once fetched on mount.
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { currentQuestionIndexRef.current = currentQuestionIndex; }, [currentQuestionIndex]);
  useEffect(() => { questionsRef.current = questions; }, [questions]);
  useEffect(() => { scoreRef.current = score; }, [score]);
  useEffect(() => { timeLeftRef.current = timeLeft; }, [timeLeft]);
  useEffect(() => { userAnswersRef.current = userAnswers; }, [userAnswers]);

  // Fetch the session_id from the server on mount.
  useEffect(() => {
    fetch('/api/session')
      .then((r) => r.json())
      .then(({ sessionId }: { sessionId: string }) => {
        sessionIdRef.current = sessionId;
      })
      .catch(() => {});
  }, []);

  // Restore state from localStorage on mount.
  useEffect(() => {
    const result = getDailyResult();
    if (!result) return;

    setScore(result.score);
    setScoreSaved(hasSavedScore());
    setStreak(getStreak());
    setAlreadyPlayed(result);
    if (result.timeSeconds !== undefined) setTotalSeconds(result.timeSeconds);
    if (result.userAnswers) setUserAnswers(result.userAnswers);

    // Fetch today's questions from the server so the game-over review screen works
    fetch('/api/daily-questions')
      .then((r) => r.json())
      .then(({ questions: qs }: { questions: Question[] }) => {
        if (qs?.length) setQuestions(qs);
      })
      .catch(() => {})
      .finally(() => setGameState('gameOver'));
  }, []);

  // Timer
  useEffect(() => {
    if (gameState !== 'playing' || selectedAnswer !== null) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((p) => p - 1), 1000);
      return () => clearTimeout(timer);
    }

    // Time's up — record full TIMER_SECONDS for this question, show wrong state
    questionTimesRef.current.push(TIMER_SECONDS);
    setUserAnswers((prev) => [...prev, '']);
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
      // Sum per-question times. Each entry is seconds used (TIMER_SECONDS - timeLeft
      // at answer time, or TIMER_SECONDS for a timeout).
      const seconds = questionTimesRef.current.reduce((a, b) => a + b, 0);

      saveDailyResultLocal(finalScore, totalQuestions, seconds, userAnswersRef.current);
      const streakCount = getStreak();
      setAlreadyPlayed({ date: getTodayString(), score: finalScore, totalQuestions, timeSeconds: seconds });
      setStreak(streakCount);
      setTotalSeconds(seconds);

      track('daily_quiz_completed', {
        quiz_mode: 'daily',
        score: finalScore,
        question_count: totalQuestions,
        streak_count: streakCount,
        date: getTodayString(),
      });

      supabase
        .from('daily_results')
        .insert({
          quiz_date: getTodayString(),
          session_id: sessionIdRef.current,
          score: finalScore,
          total_questions: totalQuestions,
          time_seconds: seconds,
        })
        .then(() => {});
    },
    [supabase]
  );

  const advanceOrEnd = useCallback(
    (currentScore: number) => {
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
        persistResult(currentScore, total);
      }
    },
    [persistResult]
  );

  const startGame = async () => {
    if (hasPlayedToday()) return;
    setQuestionsLoading(true);

    let qs: Question[] = [];
    try {
      const res = await fetch('/api/daily-questions');
      const data = await res.json();
      qs = data.questions ?? [];
    } catch {
      // If the fetch fails, abort — don't start with zero questions
      setQuestionsLoading(false);
      return;
    }

    if (qs.length === 0) {
      setQuestionsLoading(false);
      return;
    }

    setQuestions(qs);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTotalSeconds(null);
    setScoreSaved(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTimeLeft(TIMER_SECONDS);
    setUserAnswers([]);
    questionTimesRef.current = [];
    setQuestionsLoading(false);
    setGameState('playing');

    track('daily_quiz_started', {
      quiz_mode: 'daily',
      question_count: qs.length,
      streak_count: getStreak(),
      date: getTodayString(),
    });
  };

  const handleAnswer = (answer: string) => {
    if (gameStateRef.current !== 'playing' || selectedAnswer !== null) return;
    const currentQ = questionsRef.current[currentQuestionIndexRef.current];
    if (!currentQ) return;

    // Record seconds used for this question before state updates clear timeLeft.
    questionTimesRef.current.push(TIMER_SECONDS - timeLeftRef.current);

    const correct = answer === currentQ.correctAnswer;
    const newScore = scoreRef.current + (correct ? 1 : 0);

    setUserAnswers((prev) => [...prev, answer]);
    setSelectedAnswer(answer);
    setIsCorrect(correct);
    playSound(correct);
    if (correct) setScore(newScore);
  };

  const continueToNext = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    advanceOrEnd(scoreRef.current);
  }, [advanceOrEnd]);

  const saveDailyContact = async (
    firstName: string,
    lastInitial: string,
    phone: string,
    smsConsent: boolean
  ) => {
    if (scoreSaved) return;

    const res = await fetch('/api/identity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName,
        lastInitial,
        phone,
        smsConsent,
        streak: getStreak(),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('Failed to save identity:', text);
      return;
    }

    setScoreSaved(true);
    markScoreSaved();
    // Persist display name so practice mode can pre-fill the save form
    const displayName = `${firstName.trim()} ${lastInitial.trim().toUpperCase()}.`.trim();
    saveUserDisplayName(displayName);

    track('user_info_submitted', {
      quiz_mode: 'daily',
      score,
      streak_count: getStreak(),
      date: getTodayString(),
    });
  };

  return {
    gameState,
    questionsLoading,
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
    totalSeconds,
    userAnswers,
    startGame,
    handleAnswer,
    continueToNext,
    saveDailyContact,
  };
}

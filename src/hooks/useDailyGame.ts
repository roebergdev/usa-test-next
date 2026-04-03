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
  hasSavedScore,
  markScoreSaved,
  getStreak,
  getTodayString,
  type DailyResult,
} from '@/lib/daily';
import { track } from '@/lib/analytics';

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

  // Holds the session_id returned by /api/session once fetched on mount.
  // Used for the daily_results insert — avoids depending on localStorage.
  const sessionIdRef = useRef<string | null>(null);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { currentQuestionIndexRef.current = currentQuestionIndex; }, [currentQuestionIndex]);
  useEffect(() => { questionsRef.current = questions; }, [questions]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  // Fetch the session_id from the server on mount.
  // The session_id lives in an HTTP-only cookie (set by middleware) so the
  // browser can't read it directly. /api/session reads it server-side and
  // returns it; it also upserts the sessions DB row.
  useEffect(() => {
    fetch('/api/session')
      .then((r) => r.json())
      .then(({ sessionId }: { sessionId: string }) => {
        sessionIdRef.current = sessionId;
      })
      .catch(() => {
        // Non-fatal: daily_results will insert with a null session_id.
      });
  }, []);

  // Restore state from localStorage on mount.
  // If the user already completed today's quiz, jump straight to 'gameOver'
  // so DailyGameApp immediately shows the results/save screen.
  useEffect(() => {
    const result = getDailyResult();
    if (result) {
      const qs = getDailyQuestions(); // deterministic — same result for today's seed
      setQuestions(qs);
      setScore(result.score);
      setScoreSaved(hasSavedScore());
      setStreak(getStreak());
      setAlreadyPlayed(result);
      setGameState('gameOver');
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
      const streakCount = getStreak();
      setAlreadyPlayed({ date: getTodayString(), score: finalScore, totalQuestions });
      setStreak(streakCount);

      track('daily_quiz_completed', {
        quiz_mode: 'daily',
        score: finalScore,
        question_count: totalQuestions,
        streak_count: streakCount,
        date: getTodayString(),
      });

      // Insert daily result using the cookie-backed session_id.
      // user_id is left null here; /api/identity backfills it after the user
      // submits their contact info.
      supabase
        .from('daily_results')
        .insert({
          quiz_date: getTodayString(),
          session_id: sessionIdRef.current, // null if session fetch failed
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

  /**
   * saveDailyContact — called when the user submits the "Claim My Spot" form.
   *
   * Delegates to POST /api/identity which handles:
   *   - user upsert/lookup by normalized phone
   *   - session → user linking
   *   - daily_results user_id backfill
   *   - leaderboard insert
   *   - leads insert
   *   - SMS notification (if consented)
   *
   * The HTTP-only session_id cookie is read server-side by the API route —
   * we do not pass it in the request body.
   */
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
        score,
        totalQuestions: questionsRef.current.length,
        streak: getStreak(),
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('Failed to save identity:', text);
      return;
    }

    setScoreSaved(true);
    markScoreSaved(); // persist across page reloads

    track('user_info_submitted', {
      quiz_mode: 'daily',
      score,
      streak_count: getStreak(),
      date: getTodayString(),
    });
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
    saveDailyContact,
  };
}

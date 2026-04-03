'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { useQuestions } from '@/hooks/useQuestions';
import { Question } from '@/lib/types';
import { TIMER_SECONDS, CONTACT_FORM_TRIGGER, TOTAL_QUESTIONS } from '@/lib/constants';

export function useGame() {
  const { supabase } = useSupabaseContext();
  const { fetchQuestions, generateQuestions } = useQuestions();

  // Game state
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'gameOver'>('lobby');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactCollected, setContactCollected] = useState(false);

  // Use refs to avoid stale closures in setTimeout callbacks
  const gameStateRef = useRef(gameState);
  const currentQuestionIndexRef = useRef(currentQuestionIndex);
  const questionsRef = useRef(questions);
  const contactCollectedRef = useRef(contactCollected);

  useEffect(() => { gameStateRef.current = gameState; }, [gameState]);
  useEffect(() => { currentQuestionIndexRef.current = currentQuestionIndex; }, [currentQuestionIndex]);
  useEffect(() => { questionsRef.current = questions; }, [questions]);
  useEffect(() => { contactCollectedRef.current = contactCollected; }, [contactCollected]);

  // Timer logic
  useEffect(() => {
    if (gameState !== 'playing' || selectedAnswer !== null) return;

    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    }

    // Time's up — treat as wrong answer
    setSelectedAnswer('');
    setIsCorrect(false);
    playSound(false);

    const questionNumber = currentQuestionIndex + 1;
    const timerId = setTimeout(() => {
      if (gameStateRef.current !== 'playing') return;
      if (questionNumber === CONTACT_FORM_TRIGGER && !contactCollectedRef.current) {
        setShowContactForm(true);
        return;
      }
      advance();
    }, 1500);

    return () => clearTimeout(timerId);
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
    setShowContactForm(false);
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

    const questionNumber = currentQuestionIndexRef.current + 1;

    setTimeout(() => {
      if (gameStateRef.current !== 'playing') return;
      if (questionNumber === CONTACT_FORM_TRIGGER && !contactCollectedRef.current) {
        setShowContactForm(true);
        return;
      }
      advance();
    }, 1500);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue || !contactName) return;
    setIsSubmittingContact(true);
    try {
      await supabase.from('leads').insert({
        name: contactName,
        phone: contactValue,
        type: 'phone',
        score,
      });
      setContactCollected(true);
      setShowContactForm(false);
      advance();
    } catch (err) {
      console.error('Failed to save contact info', err);
      alert('Failed to save contact info. Please try again.');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const goToLobby = () => {
    setGameState('lobby');
    setContactCollected(false);
    setContactName('');
    setContactValue('');
  };

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
    showContactForm,
    contactName,
    setContactName,
    contactValue,
    setContactValue,
    isSubmittingContact,
    totalQuestions: questions.length,
    startGame,
    handleAnswer,
    handleContactSubmit,
    saveScoreWithName,
    goToLobby,
  };
}

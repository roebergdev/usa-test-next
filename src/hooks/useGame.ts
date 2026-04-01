'use client';

import { useState, useEffect } from 'react';
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
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [contactValue, setContactValue] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactCollected, setContactCollected] = useState(false);

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && selectedAnswer === null) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing' && selectedAnswer === null) {
      handleAnswer('');
    }
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

  const saveScoreWithName = async (name: string) => {
    if (scoreSaved || score === 0) return;
    const { error } = await supabase.from('leaderboard').insert({
      display_name: name,
      score,
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
      const allQuestions: Question[] = [];
      const asked: string[] = [];

      for (let diff = 1; diff <= TOTAL_QUESTIONS; diff++) {
        let q = await fetchQuestions(diff, 1, asked);
        if (q.length === 0) {
          q = await generateQuestions(diff, 1, asked);
        }
        if (q.length > 0) {
          allQuestions.push(q[0]);
          asked.push(q[0].text);
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

  const advanceOrEnd = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTimeLeft(TIMER_SECONDS);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setGameState('gameOver');
    }
  };

  const handleAnswer = async (answer: string) => {
    setSelectedAnswer(answer);
    const currentQ = questions[currentQuestionIndex];
    const correct = answer === currentQ.correctAnswer;
    setIsCorrect(correct);
    playSound(correct);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    const questionNumber = currentQuestionIndex + 1;

    setTimeout(() => {
      if (questionNumber === CONTACT_FORM_TRIGGER && !contactCollected) {
        setShowContactForm(true);
        return;
      }
      advanceOrEnd();
    }, 1500);
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactValue) return;
    setIsSubmittingContact(true);
    try {
      const updateData = contactType === 'email' ? { email: contactValue } : { phone: contactValue };
      await supabase.from('leads').insert({
        ...updateData,
        type: contactType,
        score,
      });
      setContactCollected(true);
      setShowContactForm(false);
      advanceOrEnd();
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
  };

  return {
    // Game state
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
    contactType,
    setContactType,
    contactValue,
    setContactValue,
    isSubmittingContact,
    totalQuestions: questions.length,
    // Actions
    startGame,
    handleAnswer,
    handleContactSubmit,
    saveScoreWithName,
    goToLobby,
  };
}

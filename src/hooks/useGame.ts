'use client';

import { useState, useEffect } from 'react';
import { useSupabaseContext } from '@/components/providers/SupabaseProvider';
import { useQuestions } from '@/hooks/useQuestions';
import { Question } from '@/lib/types';
import { TIMER_SECONDS, CONTACT_FORM_TRIGGER, QUESTIONS_PER_BATCH } from '@/lib/constants';

export function useGame() {
  const { supabase } = useSupabaseContext();
  const { fetchQuestions, generateQuestions } = useQuestions();

  // Player identity
  const [playerName, setPlayerName] = useState('');
  const [nameConfirmed, setNameConfirmed] = useState(false);

  // Game state
  const [gameState, setGameState] = useState<'lobby' | 'playing' | 'gameOver'>('lobby');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(false);
  const [askedQuestions, setAskedQuestions] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [sessionQuestionCount, setSessionQuestionCount] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactType, setContactType] = useState<'email' | 'phone'>('email');
  const [contactValue, setContactValue] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [contactCollected, setContactCollected] = useState(false);

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0 && !selectedAnswer) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === 'playing' && !selectedAnswer) {
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

  const saveScore = async () => {
    if (scoreSaved || !playerName || score === 0) return;
    setScoreSaved(true);
    const { error } = await supabase.from('leaderboard').insert({
      display_name: playerName,
      score,
    });
    if (error) {
      console.error('Failed to save score:', error.message, error.details, error.hint);
    }
  };

  const confirmName = (name: string) => {
    setPlayerName(name.trim());
    setNameConfirmed(true);
  };

  const startGame = async () => {
    setLoading(true);
    setScore(0);
    setScoreSaved(false);
    setAskedQuestions([]);
    setDifficulty(1);
    setCurrentQuestionIndex(0);
    setSessionQuestionCount(0);
    setShowContactForm(false);
    setSelectedAnswer(null);
    setIsCorrect(null);

    try {
      let initialQuestions = await fetchQuestions(1, QUESTIONS_PER_BATCH, []);
      if (initialQuestions.length === 0) {
        initialQuestions = await generateQuestions(1, QUESTIONS_PER_BATCH, []);
      }
      if (initialQuestions.length === 0) {
        throw new Error('Could not load questions. Please try again.');
      }

      setQuestions(initialQuestions);
      setAskedQuestions(initialQuestions.map((q) => q.text));
      setGameState('playing');
      setTimeLeft(TIMER_SECONDS);
    } catch (err) {
      console.error('Failed to start game:', err);
      alert(err instanceof Error ? err.message : 'Failed to start game.');
    } finally {
      setLoading(false);
    }
  };

  const fetchNextBatch = async (nextDifficulty: number, currentAsked: string[]) => {
    setLoading(true);
    try {
      setDifficulty(nextDifficulty);
      let nextQuestions = await fetchQuestions(nextDifficulty, QUESTIONS_PER_BATCH, currentAsked);
      if (nextQuestions.length === 0) {
        nextQuestions = await generateQuestions(nextDifficulty, QUESTIONS_PER_BATCH, currentAsked);
      }
      if (nextQuestions.length > 0) {
        setQuestions(nextQuestions);
        setAskedQuestions((prev) => [...prev, ...nextQuestions.map((q) => q.text)]);
        setCurrentQuestionIndex(0);
      } else {
        endGame();
      }
    } catch (err) {
      console.error('Failed to fetch more questions:', err);
      endGame();
    } finally {
      setLoading(false);
    }
  };

  const advanceOrFetchNext = async () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setTimeLeft(TIMER_SECONDS);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const nextDifficulty = Math.min(10, difficulty + 1);
      await fetchNextBatch(nextDifficulty, askedQuestions);
    }
  };

  const handleAnswer = async (answer: string) => {
    setSelectedAnswer(answer);
    const currentQ = questions[currentQuestionIndex];
    const correct = answer === currentQ.correctAnswer;
    setIsCorrect(correct);
    playSound(correct);

    if (correct) {
      setScore((prev) => prev + Math.floor(difficulty * 10));
      const newSessionCount = sessionQuestionCount + 1;
      setSessionQuestionCount(newSessionCount);

      setTimeout(async () => {
        if (newSessionCount === CONTACT_FORM_TRIGGER && !contactCollected) {
          setShowContactForm(true);
          return;
        }
        await advanceOrFetchNext();
      }, 1500);
    } else {
      setTimeout(() => {
        endGame();
        setSelectedAnswer(null);
        setIsCorrect(null);
      }, 1500);
    }
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
      await advanceOrFetchNext();
    } catch (err) {
      console.error('Failed to save contact info', err);
      alert('Failed to save contact info. Please try again.');
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const endGame = async () => {
    setGameState('gameOver');
    await saveScore();
  };

  const goToLobby = () => {
    setGameState('lobby');
    setNameConfirmed(false);
    setPlayerName('');
    setContactCollected(false);
  };

  return {
    // Player
    playerName,
    setPlayerName,
    nameConfirmed,
    confirmName,
    // Game state
    gameState,
    questions,
    currentQuestionIndex,
    score,
    difficulty,
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
    // Actions
    startGame,
    handleAnswer,
    handleContactSubmit,
    goToLobby,
  };
}

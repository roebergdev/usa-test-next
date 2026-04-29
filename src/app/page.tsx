'use client';

import { useState, useEffect } from 'react';
import { PRACTICE_CATEGORIES } from '@/data/questions';
import { useGame } from '@/hooks/useGame';
import { useDailyGame } from '@/hooks/useDailyGame';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomeScreen } from '@/components/HomeScreen';
import { GameBoard } from '@/components/GameBoard';
import { GameOver } from '@/components/GameOver';

import { AnimatePresence, motion } from 'motion/react';

type AppScreen = 'home' | 'daily' | 'practice';

// Daily quiz sub-app — owns useDailyGame hook
function DailyGameApp({
  onBack,
  onPlayPractice,
}: {
  onBack: () => void;
  onPlayPractice: () => void;
}) {
  const game = useDailyGame();

  // Start game on mount if not already played.
  // startGame() has an internal hasPlayedToday() guard — safe to always call.
  // Runs in useEffect to avoid state updates during render.
  useEffect(() => {
    game.startGame();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence mode="wait">
      {/* State: loading / transitioning */}
      {game.gameState === 'idle' && (
        <div key="daily-loading" className="flex items-center justify-center py-32">
          <div className="w-8 h-8 border-4 border-amac-blue border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* State 4: content unavailable fallback */}
      {game.gameState === 'playing' && game.questions.length === 0 && (
        <motion.div
          key="daily-unavailable"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl mx-auto text-center py-16 sm:py-24 space-y-6"
        >
          <div className="w-14 h-14 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto">
            <span className="text-2xl">📡</span>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-black tracking-tight text-amac-dark">
              Today&apos;s quiz isn&apos;t ready yet
            </h3>
            <p className="text-neutral-500 font-medium text-sm max-w-xs mx-auto">
              We&apos;re having trouble loading today&apos;s questions. Try again in a moment.
            </p>
          </div>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-amac-gray text-neutral-600 rounded-xl font-black text-sm hover:bg-neutral-200 transition-all"
          >
            Go Home
          </button>
        </motion.div>
      )}

      {/* State 1 / active game */}
      {game.gameState === 'playing' && game.questions.length > 0 && (
        <GameBoard
          key="daily-board"
          question={game.questions[game.currentQuestionIndex]}
          score={game.score}
          timeLeft={game.timeLeft}
          selectedAnswer={game.selectedAnswer}
          isCorrect={game.isCorrect}
          loading={false}
          onAnswer={game.handleAnswer}
          onContinue={game.continueToNext}
          questionNumber={game.currentQuestionIndex + 1}
          totalQuestions={game.totalQuestions}
        />
      )}

      {/* States 2 + 3: completed (unsaved or saved) */}
      {game.gameState === 'gameOver' && (
        <GameOver
          key="daily-over"
          mode="daily"
          score={game.score}
          totalQuestions={game.totalQuestions}
          onSaveDailyContact={game.saveDailyContact}
          scoreSaved={game.scoreSaved}
          dbSyncState={game.dbSyncState}
          onGoToLobby={onBack}
          onPlayPractice={onPlayPractice}
          streak={game.streak}
          totalSeconds={game.totalSeconds}
          questions={game.questions}
          userAnswers={game.userAnswers}
        />
      )}
    </AnimatePresence>
  );
}

// Practice sub-app — owns useGame hook
function PracticeGameApp({
  onBack,
  category,
}: {
  onBack: () => void;
  category: string | null;
}) {
  const game = useGame(category);

  useEffect(() => {
    if (game.gameState === 'lobby' && !game.loading) {
      game.startGame();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence mode="wait">
      {/* lobby state is transient — auto-started above */}

      {game.gameState === 'playing' && game.questions.length > 0 && (
        <GameBoard
          key="practice-board"
          question={game.questions[game.currentQuestionIndex]}
          score={game.score}
          timeLeft={game.timeLeft}
          selectedAnswer={game.selectedAnswer}
          isCorrect={game.isCorrect}
          loading={game.loading}
          onAnswer={game.handleAnswer}
          onContinue={game.continueToNext}
          questionNumber={game.currentQuestionIndex + 1}
          totalQuestions={game.totalQuestions}
        />
      )}

      {game.gameState === 'gameOver' && (
        <GameOver
          key="practice-over"
          mode="practice"
          score={game.score}
          totalQuestions={game.totalQuestions}
          onRestart={game.startGame}
          onGoToLobby={onBack}
          scoreSaved={game.scoreSaved}
          questions={game.questions}
          userAnswers={game.userAnswers}
        />
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<AppScreen>('home');
  const [practiceCategory, setPracticeCategory] = useState<string | null>(null);
  const [practiceRunId, setPracticeRunId] = useState(0);

  const startPractice = (category: string | null = null) => {
    setPracticeCategory(category);
    setPracticeRunId((prev) => prev + 1);
    setScreen('practice');
  };

  return (
    <div className="min-h-screen bg-amac-gray text-amac-dark font-sans selection:bg-amac-blue/10">
      <Header onHome={() => setScreen('home')} />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <HomeScreen
              key="home"
              onPlayDaily={() => setScreen('daily')}
              onPlayPractice={() => startPractice()}
              onPlayPracticeCategory={(category) => startPractice(category)}
            />
          )}

          {screen === 'daily' && (
            <DailyGameApp
              key="daily"
              onBack={() => setScreen('home')}
              onPlayPractice={() => startPractice()}
            />
          )}

          {screen === 'practice' && (
            <PracticeGameApp
              key={`practice-${practiceCategory ?? 'all'}-${practiceRunId}`}
              onBack={() => setScreen('home')}
              category={practiceCategory}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer
        categories={PRACTICE_CATEGORIES}
        activeCategory={screen === 'practice' ? practiceCategory : null}
        onSelectCategory={(category) => startPractice(category)}
      />
    </div>
  );
}

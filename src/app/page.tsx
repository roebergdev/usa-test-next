'use client';

import { useState, useEffect } from 'react';
import { useGame } from '@/hooks/useGame';
import { useDailyGame } from '@/hooks/useDailyGame';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HomeScreen } from '@/components/HomeScreen';
import { GameBoard } from '@/components/GameBoard';
import { GameOver } from '@/components/GameOver';
import { ContactForm } from '@/components/ContactForm';
import { AnimatePresence } from 'motion/react';

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

  // Start game immediately on mount if not already played
  if (game.gameState === 'idle' && !game.alreadyPlayed) {
    game.startGame();
  }

  return (
    <AnimatePresence mode="wait">
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

      {game.gameState === 'gameOver' && (
        <GameOver
          key="daily-over"
          mode="daily"
          score={game.score}
          totalQuestions={game.totalQuestions}
          onSaveDailyContact={game.saveDailyContact}
          scoreSaved={game.scoreSaved}
          onGoToLobby={onBack}
          onPlayPractice={onPlayPractice}
          streak={game.streak}
        />
      )}
    </AnimatePresence>
  );
}

// Practice sub-app — owns useGame hook
function PracticeGameApp({ onBack }: { onBack: () => void }) {
  const game = useGame();

  useEffect(() => {
    if (game.gameState === 'lobby' && !game.loading) {
      game.startGame();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence mode="wait">
      {/* lobby state is transient — auto-started above */}

      {game.showContactForm && (
        <ContactForm
          key="contact"
          contactName={game.contactName}
          setContactName={game.setContactName}
          contactValue={game.contactValue}
          setContactValue={game.setContactValue}
          isSubmittingContact={game.isSubmittingContact}
          onSubmit={game.handleContactSubmit}
        />
      )}

      {game.gameState === 'playing' &&
        game.questions.length > 0 &&
        !game.showContactForm && (
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
          onSaveScore={game.saveScoreWithName}
          scoreSaved={game.scoreSaved}
          playerName={game.contactName}
        />
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<AppScreen>('home');

  return (
    <div className="min-h-screen bg-amac-gray text-amac-dark font-sans selection:bg-amac-blue/10">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
        <AnimatePresence mode="wait">
          {screen === 'home' && (
            <HomeScreen
              key="home"
              onPlayDaily={() => setScreen('daily')}
              onPlayPractice={() => setScreen('practice')}
            />
          )}

          {screen === 'daily' && (
            <DailyGameApp
              key="daily"
              onBack={() => setScreen('home')}
              onPlayPractice={() => setScreen('practice')}
            />
          )}

          {screen === 'practice' && (
            <PracticeGameApp key="practice" onBack={() => setScreen('home')} />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

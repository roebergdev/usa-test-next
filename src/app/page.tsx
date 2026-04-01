'use client';

import { useGame } from '@/hooks/useGame';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GameLobby } from '@/components/GameLobby';
import { GameBoard } from '@/components/GameBoard';
import { GameOver } from '@/components/GameOver';
import { ContactForm } from '@/components/ContactForm';
import { AnimatePresence } from 'motion/react';

function GameApp() {
  const game = useGame();

  return (
    <div className="min-h-screen bg-amac-gray text-amac-dark font-sans selection:bg-amac-blue/10">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 sm:py-16">
        <AnimatePresence mode="wait">
          {game.gameState === 'lobby' && (
            <GameLobby
              playerName={game.playerName}
              nameConfirmed={game.nameConfirmed}
              onNameChange={game.setPlayerName}
              onConfirmName={game.confirmName}
              onStartGame={game.startGame}
              loading={game.loading}
            />
          )}

          {game.showContactForm && (
            <ContactForm
              contactType={game.contactType}
              setContactType={game.setContactType}
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
                question={game.questions[game.currentQuestionIndex]}
                score={game.score}
                timeLeft={game.timeLeft}
                selectedAnswer={game.selectedAnswer}
                isCorrect={game.isCorrect}
                loading={game.loading}
                onAnswer={game.handleAnswer}
              />
            )}

          {game.gameState === 'gameOver' && (
            <GameOver
              score={game.score}
              playerName={game.playerName}
              onRestart={game.startGame}
              onGoToLobby={game.goToLobby}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default function Home() {
  return <GameApp />;
}

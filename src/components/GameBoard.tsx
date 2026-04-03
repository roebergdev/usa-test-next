'use client';

import { Question } from '@/lib/types';
import { Timer } from '@/components/Timer';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface GameBoardProps {
  question: Question;
  score: number;
  timeLeft: number;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  loading: boolean;
  onAnswer: (answer: string) => void;
  onContinue: () => void;
  questionNumber: number;
  totalQuestions: number;
}

function getDifficultyLabel(difficulty: number): { label: string; cls: string } {
  if (difficulty <= 2) return { label: 'Easy', cls: 'text-green-700 bg-green-50 border-green-200' };
  if (difficulty <= 5) return { label: 'Medium', cls: 'text-amber-700 bg-amber-50 border-amber-200' };
  return { label: 'Hard', cls: 'text-red-700 bg-red-50 border-red-200' };
}

export function GameBoard({
  question,
  score,
  timeLeft,
  selectedAnswer,
  isCorrect,
  loading,
  onAnswer,
  onContinue,
  questionNumber,
  totalQuestions,
}: GameBoardProps) {
  const answered = selectedAnswer !== null;
  const timedOut = answered && selectedAnswer === '';
  const diff = getDifficultyLabel(question.difficulty);

  return (
    <motion.div
      key="playing"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto space-y-4 sm:space-y-5"
    >
      {/* Progress row */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex-1 flex items-center gap-1.5">
          {Array.from({ length: totalQuestions }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i < questionNumber - 1
                  ? 'bg-amac-blue'
                  : i === questionNumber - 1
                  ? 'bg-amac-blue/35'
                  : 'bg-neutral-200'
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] sm:text-xs font-black text-neutral-400 uppercase tracking-widest whitespace-nowrap">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-amac-blue/10 rounded-full shadow-sm">
          <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Score</span>
          <span className="text-xs font-black text-amac-blue">{score}</span>
        </div>
        <Timer timeLeft={timeLeft} />
      </div>

      {/* Question card */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white border border-amac-blue/5 rounded-3xl p-6 sm:p-10 shadow-xl shadow-amac-blue/5"
      >
        <div className="flex items-center gap-2 mb-4 sm:mb-5 flex-wrap">
          <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border ${diff.cls}`}>
            {diff.label}
          </span>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400 px-2.5 py-1 bg-neutral-50 border border-neutral-200 rounded-full">
            {question.category}
          </span>
        </div>
        <h3 className="text-xl sm:text-3xl font-black tracking-tight leading-snug text-amac-dark">
          {question.text}
        </h3>
      </motion.div>

      {/* Answer grid */}
      <div className="grid sm:grid-cols-2 gap-2.5 sm:gap-3">
        {question.options.map((option, i) => {
          const isSelected = selectedAnswer === option;
          const isCorrectOption = option === question.correctAnswer;

          let cls =
            'bg-white border-neutral-200 hover:border-amac-blue/40 hover:bg-amac-gray/60 active:scale-[0.98] cursor-pointer';
          if (answered) {
            if (isCorrectOption)
              cls = 'bg-amac-blue/8 border-amac-blue cursor-default';
            else if (isSelected)
              cls = 'bg-amac-red/8 border-amac-red cursor-default';
            else
              cls = 'bg-white border-neutral-100 opacity-35 cursor-default';
          }

          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              disabled={answered}
              onClick={() => onAnswer(option)}
              className={`w-full min-h-[64px] sm:min-h-[72px] p-4 sm:p-5 rounded-2xl border-2 text-left font-bold text-sm sm:text-base transition-all flex items-center gap-3 sm:gap-4 ${cls}`}
            >
              <span
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 transition-colors ${
                  answered && isCorrectOption
                    ? 'bg-amac-blue text-white'
                    : answered && isSelected && !isCorrectOption
                    ? 'bg-amac-red text-white'
                    : 'bg-neutral-100 text-neutral-400'
                }`}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1 leading-snug">{option}</span>
              {answered && isCorrectOption && (
                <CheckCircle2 className="w-5 h-5 text-amac-blue shrink-0" />
              )}
              {answered && isSelected && !isCorrectOption && (
                <XCircle className="w-5 h-5 text-amac-red shrink-0" />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Feedback + Continue */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className={`rounded-2xl border p-4 sm:p-6 space-y-4 ${
              isCorrect
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-start gap-3">
              {isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className={`font-black text-sm sm:text-base ${isCorrect ? 'text-green-700' : 'text-red-600'}`}>
                  {timedOut ? "Time's up!" : isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
                {!isCorrect && (
                  <p className="text-sm text-red-600 font-medium mt-0.5">
                    Correct answer:{' '}
                    <span className="font-black">{question.correctAnswer}</span>
                  </p>
                )}
                {question.explanation && (
                  <p className="text-sm text-neutral-600 mt-2 leading-relaxed">
                    {question.explanation}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={onContinue}
              className={`w-full py-3 sm:py-4 rounded-xl font-black text-sm sm:text-base flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-sm ${
                isCorrect
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-amac-red hover:bg-amac-red/90 text-white'
              }`}
            >
              {questionNumber < totalQuestions ? 'Next Question' : 'See Results'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {loading && (
        <div className="flex justify-center pt-2">
          <div className="w-6 h-6 border-4 border-amac-blue border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </motion.div>
  );
}

'use client';

import { Question } from '@/lib/types';
import { getRank } from '@/lib/constants';
import { Timer } from '@/components/Timer';
import { motion } from 'motion/react';
import { Flag, CheckCircle2, XCircle } from 'lucide-react';

interface GameBoardProps {
  question: Question;
  score: number;
  timeLeft: number;
  selectedAnswer: string | null;
  isCorrect: boolean | null;
  loading: boolean;
  onAnswer: (answer: string) => void;
}

export function GameBoard({
  question,
  score,
  timeLeft,
  selectedAnswer,
  loading,
  onAnswer,
}: GameBoardProps) {
  return (
    <motion.div
      key="playing"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-3xl mx-auto space-y-6 sm:space-y-12"
    >
      {/* Score bar */}
      <div className="flex items-center justify-between bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2rem] border border-amac-blue/5 shadow-xl shadow-amac-blue/5 backdrop-blur-xl">
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1">
              Rank
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-amac-dark">
              {getRank(score).name}
            </span>
          </div>
          <div className="w-px h-8 sm:h-10 bg-amac-blue/10"></div>
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] text-amac-blue uppercase tracking-widest font-black mb-1">
              Score
            </span>
            <span className="text-xl sm:text-2xl font-black tracking-tighter text-amac-blue">
              {score.toLocaleString()}
            </span>
          </div>
        </div>

        <Timer timeLeft={timeLeft} />
      </div>

      {/* Question */}
      <div className="space-y-4 sm:space-y-8">
        <div className="p-6 sm:p-12 bg-white border border-amac-blue/5 rounded-3xl sm:rounded-[3rem] relative overflow-hidden shadow-2xl shadow-amac-blue/5">
          <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-[0.03] text-amac-blue">
            <Flag className="w-32 h-32 sm:w-48 sm:h-48" />
          </div>
          <div className="relative space-y-3 sm:space-y-4">
            <div className="inline-block px-3 py-1 bg-amac-blue/5 rounded-full text-[8px] sm:text-[10px] text-amac-blue font-black uppercase tracking-[0.3em]">
              {question.category}
            </div>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight sm:leading-[1.1] text-amac-dark">
              {question.text}
            </h3>
          </div>
        </div>

        {/* Answer options */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
          {question.options.map((option, i) => {
            const isSelected = selectedAnswer === option;
            const isCorrectOption = option === question.correctAnswer;

            let bgClass =
              'bg-white border-amac-blue/5 hover:border-amac-blue/50 hover:bg-amac-gray';
            if (selectedAnswer) {
              if (isCorrectOption)
                bgClass = 'bg-amac-blue/10 border-amac-blue text-amac-blue';
              else if (isSelected)
                bgClass = 'bg-amac-red/10 border-amac-red text-amac-red';
              else bgClass = 'bg-white border-amac-blue/5 opacity-30';
            }

            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                disabled={!!selectedAnswer}
                onClick={() => onAnswer(option)}
                className={`w-full p-4 sm:p-6 rounded-xl sm:rounded-[1.5rem] border text-left font-bold text-base sm:text-lg transition-all flex items-center justify-between group shadow-sm ${bgClass}`}
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-amac-gray flex items-center justify-center text-[10px] sm:text-xs font-black text-neutral-400 group-hover:bg-amac-blue/10 group-hover:text-amac-blue transition-all">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="flex-1">{option}</span>
                </div>
                {selectedAnswer && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-amac-blue shrink-0" />
                )}
                {selectedAnswer && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-amac-red shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {loading && (
        <div className="flex justify-center pt-4 sm:pt-8">
          <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-amac-blue border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </motion.div>
  );
}

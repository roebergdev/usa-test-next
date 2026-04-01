'use client';

import { motion } from 'motion/react';
import { TIMER_SECONDS } from '@/lib/constants';

interface TimerProps {
  timeLeft: number;
}

export function Timer({ timeLeft }: TimerProps) {
  return (
    <div className="relative w-12 h-12 sm:w-16 sm:h-16">
      <svg className="w-full h-full -rotate-90">
        <circle
          cx="24"
          cy="24"
          r="20"
          className="stroke-amac-gray fill-none sm:hidden"
          strokeWidth="3"
        />
        <circle
          cx="32"
          cy="32"
          r="28"
          className="stroke-amac-gray fill-none hidden sm:block"
          strokeWidth="4"
        />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          className="stroke-amac-red fill-none sm:hidden"
          strokeWidth="3"
          strokeDasharray="125.6"
          initial={{ strokeDashoffset: 125.6 }}
          animate={{ strokeDashoffset: 125.6 * (1 - timeLeft / TIMER_SECONDS) }}
        />
        <motion.circle
          cx="32"
          cy="32"
          r="28"
          className="stroke-amac-red fill-none hidden sm:block"
          strokeWidth="4"
          strokeDasharray="175.9"
          initial={{ strokeDashoffset: 175.9 }}
          animate={{ strokeDashoffset: 175.9 * (1 - timeLeft / TIMER_SECONDS) }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-black text-base sm:text-lg ${
            timeLeft < 5 ? 'text-amac-red animate-pulse' : 'text-amac-dark'
          }`}
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
}

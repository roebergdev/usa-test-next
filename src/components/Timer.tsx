'use client';

import { motion } from 'motion/react';
import { TIMER_SECONDS } from '@/lib/constants';

interface TimerProps {
  timeLeft: number;
}

export function Timer({ timeLeft }: TimerProps) {
  const pct = (timeLeft / TIMER_SECONDS) * 100;
  const urgent = timeLeft < 5;

  return (
    <div className="flex flex-col items-center gap-1 min-w-[36px]">
      <span
        className={`font-black text-sm leading-none ${
          urgent ? 'text-amac-red animate-pulse' : 'text-amac-dark'
        }`}
      >
        {timeLeft}
      </span>
      <div className="w-9 h-1.5 bg-amac-gray rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${urgent ? 'bg-amac-red' : 'bg-amac-blue'}`}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: 'linear' }}
        />
      </div>
    </div>
  );
}

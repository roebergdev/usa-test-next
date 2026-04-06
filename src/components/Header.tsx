'use client';

import { Flag } from 'lucide-react';

interface HeaderProps {
  onHome?: () => void;
}

export function Header({ onHome }: HeaderProps) {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <nav className="border-b border-amac-blue/5 bg-white/80 backdrop-blur-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <button
          onClick={onHome}
          className="flex items-center gap-3 sm:gap-4 hover:opacity-80 transition-opacity"
          aria-label="Go to home"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amac-blue rounded-lg sm:rounded-xl flex items-center justify-center shadow-xl shadow-amac-blue/20 rotate-3">
            <Flag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <span className="text-xl sm:text-2xl font-black tracking-tighter leading-none text-amac-blue">
            USA <span className="text-amac-red">TEST</span>
          </span>
        </button>
        <p className="text-sm sm:text-base font-black text-amac-dark/70 tracking-tight">{today}</p>
      </div>
    </nav>
  );
}

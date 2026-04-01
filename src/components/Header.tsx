'use client';

import { Flag } from 'lucide-react';

export function Header() {
  return (
    <nav className="border-b border-amac-blue/5 bg-white/80 backdrop-blur-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-amac-blue rounded-lg sm:rounded-xl flex items-center justify-center shadow-xl shadow-amac-blue/20 rotate-3">
            <Flag className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black tracking-tighter leading-none text-amac-blue">
              USA <span className="text-amac-red">TEST</span>
            </span>
            <span className="text-[8px] sm:text-[10px] text-neutral-400 uppercase tracking-[0.2em] sm:tracking-[0.3em] font-bold">
              Interactive Experience
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

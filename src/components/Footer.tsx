import { Flag } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-amac-blue/5 py-8 sm:py-12 mt-12 sm:mt-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
        <div className="flex items-center gap-3 opacity-50 text-amac-blue">
          <Flag className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-bold tracking-tight text-sm sm:text-base">USA TEST</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-neutral-400 text-xs sm:text-sm">
          <a href="#" className="hover:text-amac-blue transition-colors">History</a>
          <a href="#" className="hover:text-amac-blue transition-colors">Geography</a>
          <a href="#" className="hover:text-amac-blue transition-colors">Government</a>
          <a href="#" className="hover:text-amac-blue transition-colors">Culture</a>
        </div>
        <p className="text-neutral-400 text-[10px] sm:text-xs font-medium">
          &copy; 2026 USA Test Trivia. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

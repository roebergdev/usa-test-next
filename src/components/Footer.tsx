'use client';

import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  categories: readonly string[];
  activeCategory: string | null;
  onSelectCategory: (category: string) => void;
}

export function Footer({
  categories,
  activeCategory,
  onSelectCategory,
}: FooterProps) {
  const footerLinks = [
    { href: '/faq', label: 'FAQ' },
    { href: '/contact', label: 'Contact Us' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ];

  return (
    <footer className="border-t border-amac-blue/5 py-8 sm:py-12 mt-12 sm:mt-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3 opacity-50 text-amac-blue">
            <Image
              src="/logo.png"
              alt="USA Test"
              width={40}
              height={40}
              className="w-8 h-8 rounded-lg shadow-xl shadow-amac-blue/10"
            />
            <span className="font-bold tracking-tight text-sm sm:text-base">USA TEST</span>
          </div>
          <p className="text-neutral-400 text-[10px] sm:text-xs font-medium">
            &copy; 2026 USA Test Trivia. All rights reserved.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((category) => {
            const isActive = activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`px-3 py-2 rounded-full border text-[11px] sm:text-xs font-black uppercase tracking-[0.16em] transition-colors ${
                  isActive
                    ? 'bg-amac-blue text-white border-amac-blue'
                    : 'bg-amac-blue/8 text-amac-blue border-amac-blue/15 hover:bg-amac-blue/12'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3 text-xs sm:text-sm font-bold text-neutral-500">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-amac-blue"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { SupabaseProvider } from '@/components/providers/SupabaseProvider';
import './globals.css';

// Nunito is the closest open-source match to Duolingo's proprietary "din-round":
// rounded letterforms, strong weight range (400–900), excellent for game/quiz UI.
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'USA TEST - The Ultimate Trivia Challenge',
  description:
    'An interactive journey through the heart of America. Test your knowledge on history, geography, and the spirit of the USA.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${nunito.variable} antialiased`}>
      <body className="font-sans">
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}

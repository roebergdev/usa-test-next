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
  title: 'USA Test — How American Are You?',
  description:
    'Take the daily USA Test — 10 questions on history, civics, geography, and culture. See how you stack up against Americans nationwide.',
  metadataBase: new URL('https://usatest.co'),
  openGraph: {
    title: 'USA Test — How American Are You?',
    description:
      'Take the daily USA Test — 10 questions on history, civics, geography, and culture. See how you stack up against Americans nationwide.',
    url: 'https://usatest.co',
    siteName: 'USA Test',
    images: [
      {
        url: '/logo.png',
        width: 4000,
        height: 4000,
        alt: 'USA Test',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'USA Test — How American Are You?',
    description:
      'Take the daily USA Test — 10 questions on history, civics, geography, and culture. See how you stack up against Americans nationwide.',
    images: ['/logo.png'],
  },
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

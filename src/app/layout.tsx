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
  title: 'USA Test - Learn History for Free',
  description:
    'Put your knowledge to the test - 5 questions daily, find out where you rank.',
  metadataBase: new URL('https://usatest.co'),
  openGraph: {
    title: 'USA Test - Learn History for Free',
    description:
      'Put your knowledge to the test - 5 questions daily, find out where you rank.',
    url: 'https://usatest.co',
    siteName: 'USA Test',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'USA Test - Learn History for Free',
    description:
      'Put your knowledge to the test - 5 questions daily, find out where you rank.',
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

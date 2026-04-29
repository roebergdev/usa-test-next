import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
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
  title: 'USA Test - How Smart Are You?',
  description:
    'Put your knowledge to the test - 10 questions daily, find out where you rank.',
  metadataBase: new URL('https://usatest.co'),
  openGraph: {
    title: 'Take the USA Test',
    description:
      'Put your knowledge to the test - 10 questions daily, find out where you rank.',
    url: 'https://usatest.co',
    siteName: 'USA Test',
    type: 'website',
    images: [
      {
        url: 'https://usatest.co/og-image.png',
        width: 1360,
        height: 768,
        alt: 'USA Test – How Well Do You Know The USA?',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Take the USA Test',
    description:
      'Put your knowledge to the test - 10 questions daily, find out where you rank.',
    images: ['https://usatest.co/og-image.png'],
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
        <Analytics />
        <Script
          src="https://cdn.pagesense.io/js/discoverrealtime/e0a70d750fba49c48abdc1602ecb541c.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import Link from 'next/link';

type Props = {
  searchParams: Promise<{ score?: string; total?: string; streak?: string; name?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { score = '?', total = '10', streak = '0', name = '' } = await searchParams;

  const ogImageUrl = `https://usatest.co/api/og?score=${score}&total=${total}&streak=${streak}${name ? `&name=${encodeURIComponent(name)}` : ''}`;
  const title = name
    ? `${name} scored ${score}/${total} on today's USA Test`
    : `Someone scored ${score}/${total} on today's USA Test`;
  const description = `Think you can beat it? Take today's free daily test — history, civics, geography, and culture. usatest.co`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: 'https://usatest.co',
      siteName: 'USA Test',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: 'USA Test Score Card' }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function SharePage({ searchParams }: Props) {
  const { score = '?', total = '10', streak = '0', name = '' } = await searchParams;
  const streakNum = parseInt(streak);

  return (
    <div className="min-h-screen bg-amac-gray flex flex-col items-center justify-center px-4 py-16">
      <div className="max-w-md w-full space-y-6 text-center">

        {/* Brand */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-amac-blue">USA</span>
          <span className="text-2xl font-black tracking-tighter text-amac-red">TEST</span>
        </div>

        {/* Score card */}
        <div className="bg-[#0D1B3E] rounded-3xl p-8 shadow-2xl text-center space-y-3">
          {name && (
            <p className="text-white/50 text-sm font-bold uppercase tracking-widest">{name}</p>
          )}
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-8xl font-black text-white leading-none">{score}</span>
            <span className="text-4xl font-black text-white/30 leading-none">/{total}</span>
          </div>
          <p className="text-white/60 text-sm font-bold uppercase tracking-widest">Today&apos;s Score</p>
          {streakNum > 1 && (
            <div className="inline-flex items-center gap-1.5 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
              {streakNum}-Day Streak
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="space-y-2">
          <p className="text-lg font-black text-amac-dark">Think you can beat it?</p>
          <p className="text-sm text-neutral-500 font-medium">
            A new 5-question test every day — history, civics, geography, and culture.
          </p>
        </div>

        <Link
          href="/"
          className="block w-full py-4 bg-amac-red text-white rounded-xl font-black text-lg text-center hover:bg-amac-red/90 transition-all shadow-lg shadow-amac-red/20 active:scale-[0.98]"
        >
          Take Today&apos;s Test →
        </Link>

        <p className="text-xs text-neutral-400 font-medium">Free · No sign-up required · New test every day</p>
      </div>
    </div>
  );
}

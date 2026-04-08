import Link from 'next/link';

interface InfoPageProps {
  eyebrow: string;
  title: string;
  intro: string;
}

export function InfoPage({ eyebrow, title, intro }: InfoPageProps) {
  return (
    <main className="min-h-screen bg-amac-gray text-amac-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="bg-white border border-amac-blue/10 rounded-3xl shadow-xl shadow-amac-blue/5 p-8 sm:p-12 space-y-8">
          <div className="space-y-4">
            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amac-blue">
              {eyebrow}
            </p>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-neutral-600 font-medium leading-relaxed">
              {intro}
            </p>
          </div>

          <div className="space-y-5">
            <section className="rounded-2xl bg-amac-blue/5 border border-amac-blue/10 p-5">
              <h2 className="text-lg font-black text-amac-dark">Placeholder Content</h2>
              <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
                This page is live and linked in the footer. Replace this placeholder
                copy with the final content when you are ready.
              </p>
            </section>

            <section className="rounded-2xl bg-white border border-neutral-200 p-5">
              <h2 className="text-lg font-black text-amac-dark">Next Step</h2>
              <p className="mt-2 text-sm sm:text-base text-neutral-600 leading-relaxed">
                Keep the route and page title, then swap in your finalized copy,
                sections, or forms.
              </p>
            </section>
          </div>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center rounded-xl bg-amac-blue text-white px-5 py-3 text-sm font-black transition-colors hover:bg-amac-blue/90"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

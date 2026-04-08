import Link from 'next/link';

interface LegalSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  effectiveDate: string;
  sections: LegalSection[];
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  effectiveDate,
  sections,
}: LegalPageProps) {
  return (
    <main className="min-h-screen bg-amac-gray text-amac-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="relative bg-white border-2 border-amac-blue/10 rounded-3xl sm:rounded-[2.5rem] p-7 sm:p-12 shadow-xl shadow-amac-blue/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amac-blue/8 via-amac-red/4 to-transparent rounded-full blur-[80px] pointer-events-none" />

          <div className="relative space-y-8">
            <div className="space-y-4">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amac-blue">
                {eyebrow}
              </p>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[0.95] uppercase text-amac-dark">
                {title}
              </h1>
              <p className="max-w-3xl text-sm sm:text-base text-neutral-600 font-medium leading-relaxed">
                {intro}
              </p>
              <div className="inline-flex items-center rounded-full bg-amac-blue/8 border border-amac-blue/15 px-4 py-2 text-[11px] sm:text-xs font-black uppercase tracking-[0.18em] text-amac-blue">
                Effective Date: {effectiveDate}
              </div>
            </div>

            <div className="space-y-4">
              {sections.map((section, index) => (
                <section
                  key={section.title}
                  className="rounded-2xl border border-amac-blue/10 bg-amac-gray/40 p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-amac-blue/8 border border-amac-blue/15 text-amac-blue flex items-center justify-center shrink-0 text-xs font-black">
                      {index + 1}
                    </div>
                    <div className="flex-1 space-y-3">
                      <h2 className="text-lg sm:text-xl font-black tracking-tight text-amac-dark">
                        {section.title}
                      </h2>
                      {section.paragraphs?.map((paragraph) => (
                        <p
                          key={paragraph}
                          className="text-sm sm:text-base text-neutral-600 font-medium leading-relaxed"
                        >
                          {paragraph}
                        </p>
                      ))}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="space-y-2">
                          {section.bullets.map((bullet) => (
                            <li
                              key={bullet}
                              className="text-sm sm:text-base text-neutral-600 font-medium leading-relaxed flex gap-3"
                            >
                              <span className="text-amac-red font-black">•</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </section>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-amac-red text-white px-5 py-3 text-sm font-black transition-colors hover:bg-amac-red/90"
              >
                Contact Us
              </Link>
              <Link
                href="/"
                className="inline-flex items-center rounded-xl bg-amac-blue/8 border border-amac-blue/15 text-amac-blue px-5 py-3 text-sm font-black transition-colors hover:bg-amac-blue/12"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

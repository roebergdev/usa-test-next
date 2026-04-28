import Link from 'next/link';

const FAQS = [
  {
    question: 'What is USA Test?',
    answer:
      'USA Test is a daily U.S. knowledge challenge with a fresh ten-question test each day, plus a study mode for extra reps across specific categories.',
  },
  {
    question: 'How does the daily test work?',
    answer:
      'Each day you get one timed ten-question test. Everyone receives the same daily set for that day, and your result can be saved to the leaderboard after you finish.',
  },
  {
    question: 'How many questions are in the daily test?',
    answer:
      'The daily test has 10 questions. Study mode also serves a 10-question batch.',
  },
  {
    question: 'When does a new daily test become available?',
    answer:
      'A new daily test appears at the start of a new calendar day based on the site timer. Once the countdown hits zero, the next test is available.',
  },
  {
    question: 'Can I take the daily test more than once per day?',
    answer:
      'No. The daily test is intended to be one attempt per day on a given browser/device session, while study mode is available whenever you want more questions.',
  },
  {
    question: 'What is study mode?',
    answer:
      'Study mode is the untethered version of the site. It lets you keep playing outside the daily test and focus on building familiarity with the question bank.',
  },
  {
    question: 'Can I choose a topic in study mode?',
    answer:
      'Yes. You can start practice from the category pills in the home tile or from the footer category tabs to load a fresh batch from that category.',
  },
  {
    question: 'What categories are available in study mode?',
    answer:
      'Current categories include Civics, Geography, Landmarks, Military, U.S. History, American Culture, National Parks, U.S. Sports, and Famous Americans.',
  },
  {
    question: 'How is my score calculated?',
    answer:
      'You earn one point for each correct answer. Wrong answers and timeouts do not add points.',
  },
  {
    question: 'How does the countdown timer work?',
    answer:
      'Each question has a 10-second countdown. The timer resets for every new question and visually counts down as a progress bar.',
  },
  {
    question: 'What happens if I run out of time on a question?',
    answer:
      'If time expires, the answer is marked incorrect and the test continues. In review, that question is treated the same as any other missed answer.',
  },
  {
    question: 'How does the leaderboard work?',
    answer:
      'After completing the daily test, you can submit your information to claim a leaderboard spot. Study mode scores can also be saved separately.',
  },
  {
    question: 'How are ties broken on the daily leaderboard?',
    answer:
      'The site tracks completion time for the daily test. Faster completion time is used as a tiebreaker when scores are the same.',
  },
  {
    question: 'Do I need to submit my name and phone number to take the test?',
    answer:
      'No. You can take the test without submitting contact information. That step only appears after the daily test if you want to claim your leaderboard position.',
  },
  {
    question: 'Why do you ask for my phone number after the daily test?',
    answer:
      'The phone number is used to identify returning users, connect their session to a leaderboard submission, and optionally send reminders if they consent to SMS.',
  },
  {
    question: 'Will my information be shared or used for text messages?',
    answer:
      'The current flow supports optional SMS reminders when a user explicitly consents. Privacy and handling details should ultimately be governed by the site’s Privacy Policy and Terms pages.',
  },
  {
    question: 'Can I still use the site if I don’t want SMS reminders?',
    answer:
      'Yes. You can still use the site and take tests without opting in to reminders. SMS consent only affects reminder messaging and related follow-up.',
  },
  {
    question: 'Why does the site remember that I already took today’s test?',
    answer:
      'The site stores daily-test progress locally in your browser and also assigns a session identifier. That helps preserve your result and prevent accidental repeat daily entries.',
  },
  {
    question: 'Why do I see different results on another device or browser?',
    answer:
      'Some daily progress and saved state are stored locally in the browser. If you switch browsers or devices, that local history may not carry over.',
  },
  {
    question: 'Why didn’t my score save?',
    answer:
      'A score might fail to save if there is a network problem, a temporary backend issue, or incomplete submission data. Retrying the save flow usually resolves it.',
  },
  {
    question: 'Why didn’t today’s test load?',
    answer:
      'If the daily questions fail to load, it usually means there was a temporary fetch or content issue. Waiting a moment and trying again is the first thing to do.',
  },
  {
    question: 'Why do I hear sounds during the test?',
    answer:
      'The site plays feedback sounds on correct and incorrect answers to make the test feel more game-like and immediate.',
  },
  {
    question: 'Can I turn sound off?',
    answer:
      'Not yet. There is no visible mute toggle at the moment, so sound control would need to come from your device or browser until a site setting is added.',
  },
  {
    question: 'Are the questions based only on the U.S. citizenship test?',
    answer:
      'No. The site includes civics material, but it also draws from U.S. history, geography, landmarks, culture, sports, military topics, and notable Americans.',
  },
  {
    question: 'How can I contact you if I found a bad question or wrong answer?',
    answer:
      'Use the Contact Us page in the footer once you are ready to add your final contact details. That is the best place to direct feedback about errors or improvements.',
  },
] as const;

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-amac-gray text-amac-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="relative bg-white border-2 border-amac-blue/10 rounded-3xl sm:rounded-[2.5rem] p-7 sm:p-12 shadow-xl shadow-amac-blue/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-amac-blue/8 via-amac-red/4 to-transparent rounded-full blur-[80px] pointer-events-none" />

          <div className="relative space-y-8">
            <div className="space-y-4">
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amac-blue">
                FAQ
              </p>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[0.95] uppercase text-amac-dark">
                Frequently Asked
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amac-blue to-amac-red">
                  {' '}Questions
                </span>
              </h1>
              <p className="max-w-2xl text-sm sm:text-base text-neutral-600 font-medium leading-relaxed">
                These answers reflect how the site works right now, including the daily
                test, category-based study mode, timers, leaderboards, and contact capture.
              </p>
            </div>

            <div className="grid gap-3 sm:gap-4">
              {FAQS.map((item, index) => (
                <details
                  key={item.question}
                  className="group rounded-2xl border border-amac-blue/10 bg-amac-gray/50 p-5 sm:p-6 open:bg-white open:shadow-md open:shadow-amac-blue/5"
                >
                  <summary className="list-none cursor-pointer flex items-start gap-4">
                    <div className="w-8 h-8 rounded-xl bg-amac-blue/8 border border-amac-blue/15 text-amac-blue flex items-center justify-center shrink-0 text-xs font-black">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-base sm:text-lg font-black tracking-tight text-amac-dark">
                        {item.question}
                      </h2>
                    </div>
                    <div className="text-amac-blue text-xl leading-none transition-transform group-open:rotate-45">
                      +
                    </div>
                  </summary>
                  <p className="mt-4 pl-12 text-sm sm:text-base text-neutral-600 font-medium leading-relaxed">
                    {item.answer}
                  </p>
                </details>
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

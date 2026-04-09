'use client';

import { useState } from 'react';
import { Mail, MessageSquareText, ShieldAlert, Trophy } from 'lucide-react';

const CONTACT_EMAIL = 'support@usatest.co';

const TOPICS = [
  {
    title: 'Question Feedback',
    description: 'Report a question, answer, explanation, or category that looks wrong.',
    icon: MessageSquareText,
  },
  {
    title: 'Score or Leaderboard Help',
    description: 'Reach out if your score did not save or a leaderboard entry looks off.',
    icon: Trophy,
  },
  {
    title: 'Privacy or Legal Request',
    description: 'Use this for privacy, data, or terms-related questions.',
    icon: ShieldAlert,
  },
] as const;

export function ContactPageClient() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mailto = new URL(`mailto:${CONTACT_EMAIL}`);
    mailto.searchParams.set('subject', subject || 'USA Test Contact Request');
    mailto.searchParams.set(
      'body',
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = mailto.toString();
  };

  return (
    <main className="min-h-screen bg-amac-gray text-amac-dark">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-5 sm:gap-6">
          <section className="relative bg-white border-2 border-amac-blue/10 rounded-3xl sm:rounded-[2.5rem] p-7 sm:p-10 shadow-xl shadow-amac-blue/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-amac-blue/8 via-amac-red/4 to-transparent rounded-full blur-[80px] pointer-events-none" />

            <div className="relative space-y-7">
              <div className="space-y-4">
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amac-blue">
                  Contact
                </p>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[0.95] uppercase text-amac-dark">
                  Contact
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amac-blue to-amac-red">
                    {' '}Us
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-neutral-600 font-medium leading-relaxed">
                  Use this form to report a bad question, ask for help with a score or leaderboard issue,
                  or send a privacy or legal request.
                </p>
              </div>

              <div className="space-y-3">
                {TOPICS.map((topic) => (
                  <div
                    key={topic.title}
                    className="rounded-2xl border border-amac-blue/10 bg-amac-gray/40 p-4 sm:p-5"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amac-blue/8 border border-amac-blue/15 flex items-center justify-center shrink-0">
                        <topic.icon className="w-5 h-5 text-amac-blue" />
                      </div>
                      <div>
                        <h2 className="text-base font-black tracking-tight text-amac-dark">
                          {topic.title}
                        </h2>
                        <p className="mt-1 text-sm text-neutral-600 font-medium leading-relaxed">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-amac-blue/8 border border-amac-blue/15 p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 text-amac-blue">
                  <Mail className="w-4 h-4" />
                  <span className="text-xs font-black uppercase tracking-[0.18em]">
                    Best Way To Help Us Investigate
                  </span>
                </div>
                <p className="text-sm text-neutral-600 font-medium leading-relaxed">
                  Include the page you were on, what happened, your browser or device, and the
                  date of the daily test if your issue is tied to a specific score or question.
                </p>
              </div>
            </div>
          </section>

          <section className="bg-white border border-amac-blue/10 rounded-3xl p-6 sm:p-8 shadow-xl shadow-amac-blue/5">
            <div className="space-y-5">
              <div>
                <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amac-blue">
                  Send a Message
                </p>
                <p className="mt-2 text-sm sm:text-base text-neutral-600 font-medium leading-relaxed">
                  Submitting this form opens your email app addressed to{' '}
                  <span className="font-black text-amac-dark">{CONTACT_EMAIL}</span> with your
                  message pre-filled.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-amac-blue uppercase tracking-widest px-1">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="First and last name"
                      className="w-full px-4 py-3 bg-amac-gray border border-transparent focus:border-amac-blue/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-amac-dark"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-amac-blue uppercase tracking-widest px-1">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 bg-amac-gray border border-transparent focus:border-amac-blue/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-amac-dark"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-amac-blue uppercase tracking-widest px-1">
                    Subject
                  </label>
                  <input
                    required
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="What do you need help with?"
                    className="w-full px-4 py-3 bg-amac-gray border border-transparent focus:border-amac-blue/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-amac-dark"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-amac-blue uppercase tracking-widest px-1">
                    Message
                  </label>
                  <textarea
                    required
                    rows={8}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Include as much detail as you can."
                    className="w-full px-4 py-3 bg-amac-gray border border-transparent focus:border-amac-blue/20 focus:bg-white rounded-2xl outline-none transition-all font-bold text-amac-dark resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-amac-red text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-amac-red/90 transition-all shadow-lg shadow-amac-red/20"
                >
                  Open Email Draft
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

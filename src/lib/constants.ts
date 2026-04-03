export const RANKS = [
  { name: "Pioneer", threshold: 0 },
  { name: "Revolutionary", threshold: 3 },
  { name: "Statesman", threshold: 5 },
  { name: "Vanguard", threshold: 7 },
  { name: "Defender of Freedom", threshold: 9 },
  { name: "Ultimate Patriot", threshold: 10 }
];

export function getRank(score: number) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (score >= RANKS[i].threshold) {
      return {
        name: RANKS[i].name,
        level: i + 1,
        nextThreshold: RANKS[i + 1]?.threshold || null
      };
    }
  }
  return { name: "Pioneer", level: 1, nextThreshold: 3 };
}

export const TIMER_SECONDS = 10;
export const TOTAL_QUESTIONS = 10;
export const DAILY_QUIZ_QUESTIONS = 5;
export const CONTACT_FORM_TRIGGER = 5;

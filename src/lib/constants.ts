export const RANKS = [
  { name: "Pioneer", threshold: 0 },
  { name: "Revolutionary", threshold: 1000 },
  { name: "Statesman", threshold: 3000 },
  { name: "Vanguard", threshold: 6000 },
  { name: "Defender of Freedom", threshold: 10000 },
  { name: "Ultimate Patriot", threshold: 15000 }
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
  return { name: "Pioneer", level: 1, nextThreshold: 1000 };
}

export const TIMER_SECONDS = 15;
export const QUESTIONS_PER_BATCH = 3;
export const CONTACT_FORM_TRIGGER = 5;

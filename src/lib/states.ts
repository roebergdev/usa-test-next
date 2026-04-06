/**
 * Returns a flag emoji pair for a 2-letter US state code.
 * Uses Unicode regional indicator symbols (🇦–🇿).
 * e.g. stateFlag('TX') → '🇹🇽'
 */
export function stateFlag(code: string): string {
  const a = String.fromCodePoint(0x1f1e6 + (code.charCodeAt(0) - 65));
  const b = String.fromCodePoint(0x1f1e6 + (code.charCodeAt(1) - 65));
  return a + b;
}

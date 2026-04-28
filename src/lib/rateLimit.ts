const store = new Map<string, { count: number; resetAt: number }>();

// Prune expired entries every 500 calls to avoid unbounded memory growth.
let callCount = 0;
function maybePrune() {
  if (++callCount % 500 !== 0) return;
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

/**
 * Returns true if the request is allowed, false if it should be rejected.
 * @param key      Unique identifier (e.g. "identity:1.2.3.4")
 * @param max      Max requests allowed in the window
 * @param windowMs Window size in milliseconds
 */
export function rateLimit(key: string, max: number, windowMs: number): boolean {
  maybePrune();
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= max) return false;

  entry.count++;
  return true;
}

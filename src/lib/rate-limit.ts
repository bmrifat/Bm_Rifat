// In-memory sliding window rate limiter fallback

interface RateLimitRecord {
  timestamps: number[];
}

const memoryStore = new Map<string, RateLimitRecord>();

export async function rateLimit(
  ip: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): Promise<{ success: boolean; remaining: number }> {
  const now = Date.now();
  const record = memoryStore.get(ip) || { timestamps: [] };

  // Filter timestamps within current window
  const recentTimestamps = record.timestamps.filter((ts) => now - ts < windowMs);

  if (recentTimestamps.length >= limit) {
    return {
      success: false,
      remaining: 0,
    };
  }

  recentTimestamps.push(now);
  memoryStore.set(ip, { timestamps: recentTimestamps });

  // Cleanup old records occasionally
  if (memoryStore.size > 1000) {
    for (const [key, val] of memoryStore.entries()) {
      if (val.timestamps.every((ts) => now - ts > windowMs)) {
        memoryStore.delete(key);
      }
    }
  }

  return {
    success: true,
    remaining: limit - recentTimestamps.length,
  };
}

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// ✅ Connect to Upstash Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// ✅ Define rate limiting rules (5 requests per 15 minutes)
export const loginLimiter = new Ratelimit({
   redis: redis,
   limiter: Ratelimit.fixedWindow(5, "15 m"),
 });
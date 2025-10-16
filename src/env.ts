import { z } from "zod";

export const env = z.object({
    DEV: z.boolean().default(true),
    PORT: z.coerce.number().default(8080),
    REDIS_URL: z.string().default("redis://redis:6379"),
    CORS_ORIGIN: z.array(z.string()).default(["https://iamshitting.com"]),
    TTL_SEC: z.coerce.number().default(900),
    COOLDOWN_SEC: z.coerce.number().default(60),
}).parse(process.env);
import { z } from "zod";

import dotenv from "dotenv";

dotenv.config();

export const env = z.object({
    BASE_PATH: z.string().startsWith('/').default('/api'),
    PORT: z.coerce.number().default(8080),
    REDIS_URL: z.string().default("redis://redis:6379"),
    CORS_ORIGIN: z.array(z.string()).default(["https://iamshitting.com"]),
    TTL_SEC: z.coerce.number().default(900),
    COOLDOWN_SEC: z.coerce.number().default(60),
    DEVELOPMENT: z.number().gte(0).lte(1).default(1),
    VERSION: z.string().default("alpha-0.0.1"),
    BUILD: z.string().optional(),
}).parse(process.env);
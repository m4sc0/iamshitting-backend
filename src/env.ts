import { z } from "zod";

import dotenv from "dotenv";

dotenv.config();

const parseCsv = (v: unknown) =>
    typeof v === "string"
        ? v.split(",").map(s => s.trim()).filter(Boolean)
        : v;

export const env = z.object({
    BASE_PATH: z.string().startsWith('/').default('/api'),
    REDIS_URL: z.string().default("redis://redis:6379"),
    CORS_ORIGIN: z.preprocess(parseCsv, z.array(z.string()))
               .default(["https://iamshitting.com"]),
    TTL_SEC: z.coerce.number().default(900),
    COOLDOWN_SEC: z.coerce.number().default(60),
    DEVELOPMENT: z.coerce.boolean().default(false),
    VERSION: z.string().default("alpha-0.0.1"),
    BUILD: z.string().optional(),
}).parse(process.env);
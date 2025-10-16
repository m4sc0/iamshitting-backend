import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import { env } from "./env";
import apiRoutes from "./routes/api";

const app = Fastify({ logger: true });

await app.register(cors, { origin: env.CORS_ORIGIN });
await app.register(rateLimit, { max: env.COOLDOWN_SEC });

await app.register(apiRoutes);

await app.listen({ port: env.PORT, host: "0.0.0.0" });
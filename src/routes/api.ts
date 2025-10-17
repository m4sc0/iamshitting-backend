import { FastifyInstance } from "fastify"
import z from "zod";
import { env } from "../env";

const Body = z.object({ lat: z.number().gte(-90).lte(90), lon: z.number().gte(-180).lte(180) });

async function apiRoutes(app: FastifyInstance) {
    app.get("/ping", async (req, res) => {
        return res.code(200).send("pong");
    });
    app.get('/meta', async (req, res) => {
        if (env.DEVELOPMENT == 1) {
            return res.code(200).send({
                data: {
                    version: env.VERSION,
                    ttl_seconds: env.TTL_SEC,
                    cooldown_seconds: env.COOLDOWN_SEC,
                    port: env.PORT,
                    cors_origin: env.CORS_ORIGIN,
                    build: env.BUILD ?? "No build given"
                }
            });
        } else {
            return res.code(403).send("Endpoint disabled in production mode.");
        }
    })
}

export default apiRoutes;
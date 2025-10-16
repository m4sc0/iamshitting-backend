import { FastifyInstance } from "fastify"
import z from "zod";

const Body = z.object({ lat: z.number().gte(-90).lte(90), lon: z.number().gte(-180).lte(180) });

async function apiRoutes(app: FastifyInstance) {
    app.get("/api/ping", async (req, res) => {
        return res.code(200).send("pong");
    });
}

export default apiRoutes;
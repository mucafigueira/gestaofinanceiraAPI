import { getDashboard } from "../controllers/dashboard.js";

export const dashboardRouter = (req, res) => {
    if (req.url === "/dashboard" && req.method === "GET") {
        return getDashboard(req, res)
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota dashboard não encontrada" }))
};
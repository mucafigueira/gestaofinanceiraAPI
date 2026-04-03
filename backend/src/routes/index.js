// routes/index.js
import { membrosRouter } from "./membros.js";
import { entradasRouter } from "./entradas.js";
import { saidasRouter } from "./saidas.js";
import { contribuicoesRouter } from "./contribuicoes.js";
import { usuariosRouter } from "./usuarios.js";
import { dashboardRouter } from "./dashboard.js";

export const router = (req, res) => {

    if (req.url.startsWith("/dashboard")) {
        return dashboardRouter(req, res);
    }

    if (req.url.startsWith("/usuarios")) {
        return usuariosRouter(req, res);
    }

    if (req.url.startsWith("/membros")) {
        return membrosRouter(req, res);
    }

    if (req.url.startsWith("/entradas")) {
        return entradasRouter(req, res);
    }

    if (req.url.startsWith("/saidas")) {
        return saidasRouter(req, res);
    }

    if (req.url.startsWith("/contribuicoes")) {
        return contribuicoesRouter(req, res);
    }

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Rota não encontrada" }));
};



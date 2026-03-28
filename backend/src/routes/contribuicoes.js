import {
    criarContribuicao,
    listarContribuicoes,
    obterContribuicao,
    atualizarContribuicao,
    deletarContribuicao
} from "../controllers/contribuicoes.js";

export const contribuicoesRouter = (req, res) => {
    const id = req.url.split("/")[2];

    if (req.url === "/contribuicoes" && req.method === "POST") {
        return criarContribuicao(req, res);
    }

    if (req.url === "/contribuicoes" && req.method === "GET") {
        return listarContribuicoes(req, res);
    }

    if (req.url.match(/\/contribuicoes\/\d+/) && req.method === "GET") {
        return obterContribuicao(req, res, id);
    }

    if (req.url.match(/\/contribuicoes\/\d+/) && req.method === "PUT") {
        return atualizarContribuicao(req, res, id);
    }

    if (req.url.match(/\/contribuicoes\/\d+/) && req.method === "DELETE") {
        return deletarContribuicao(req, res, id);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota contribuições não encontrada" }));
};
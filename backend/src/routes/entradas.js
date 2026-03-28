import {
    criarEntrada,
    listarEntradas,
    obterEntrada,
    atualizarEntrada,
    deletarEntrada
} from "../controllers/entradas.js";

export const entradasRouter = (req, res) => {
    const id = req.url.split("/")[2];

    if (req.url === "/entradas" && req.method === "POST") {
        return criarEntrada(req, res);
    }

    if (req.url === "/entradas" && req.method === "GET") {
        return listarEntradas(req, res);
    }

    if (req.url.match(/\/entradas\/\d+/) && req.method === "GET") {
        return obterEntrada(req, res, id);
    }

    if (req.url.match(/\/entradas\/\d+/) && req.method === "PUT") {
        return atualizarEntrada(req, res, id);
    }

    if (req.url.match(/\/entradas\/\d+/) && req.method === "DELETE") {
        return deletarEntrada(req, res, id);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota entradas não encontrada" }));
};
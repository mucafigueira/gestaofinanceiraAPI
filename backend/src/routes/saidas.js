import {
    criarSaida,
    listarSaidas,
    obterSaida,
    atualizarSaida,
    deletarSaida
} from "../controllers/saidas.js";

export const saidasRouter = (req, res) => {
    const id = req.url.split("/")[2];

    if (req.url === "/saidas" && req.method === "POST") {
        return criarSaida(req, res);
    }

    if (req.url === "/saidas" && req.method === "GET") {
        return listarSaidas(req, res);
    }

    if (req.url.match(/\/saidas\/\d+/) && req.method === "GET") {
        return obterSaida(req, res, id);
    }

    if (req.url.match(/\/saidas\/\d+/) && req.method === "PUT") {
        return atualizarSaida(req, res, id);
    }

    if (req.url.match(/\/saidas\/\d+/) && req.method === "DELETE") {
        return deletarSaida(req, res, id);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota saídas não encontrada" }));
};
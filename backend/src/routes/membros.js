import {
    criarMembro,
    listarMembros,
    obterMembro,
    atualizarMembro,
    deletarMembro
} from "../controllers/membros.js";

export const membrosRouter = (req, res) => {
    const id = req.url.split("/")[2];

    if (req.url === "/membros" && req.method === "POST") {
        return criarMembro(req, res);
    }

    if (req.url === "/membros" && req.method === "GET") {
        return listarMembros(req, res);
    }

    if (req.url.match(/\/membros\/\d+/) && req.method === "GET") {
        return obterMembro(req, res, id);
    }

    if (req.url.match(/\/membros\/\d+/) && req.method === "PUT") {
        return atualizarMembro(req, res, id);
    }

    if (req.url.match(/\/membros\/\d+/) && req.method === "DELETE") {
        return deletarMembro(req, res, id);
    }

    res.writeHead(404);
    res.end(JSON.stringify({ error: "Rota membros não encontrada" }));
};
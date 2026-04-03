// controllers/membros.js
import { pool } from "../connection/db.js";

// Criar membro
export const criarMembro = async (req, res) => {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        try {
            const { name, telefone, endereco, ativo } = JSON.parse(body);

            const result = await pool.query(
                "INSERT INTO membros (name, telefone, endereco, ativo) VALUES ($1,$2,$3,$4) RETURNING *",
                [name, telefone, endereco, ativo ?? true]
            );

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result.rows[0]));
        } catch (err) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

// Listar membros
export const listarMembros = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM membros ORDER BY id DESC");

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result.rows));
    } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: err.message }));
    }
};

// Obter membro
export const obterMembro = async (req, res, id) => {
    try {
        const result = await pool.query("SELECT * FROM membros WHERE id=$1", [id]);

        if (!result.rows.length) {
            res.writeHead(404);
            return res.end(JSON.stringify({ error: "Membro não encontrado" }));
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result.rows[0]));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};

// Atualizar membro
export const atualizarMembro = async (req, res, id) => {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        try {
            const { name, telefone, endereco, ativo } = JSON.parse(body);

            const result = await pool.query(
                "UPDATE membros SET name=$1, telefone=$2, endereco=$3, ativo=$4 WHERE id=$5 RETURNING *",
                [name, telefone, endereco, ativo, id]
            );

            if (!result.rows.length) {
                res.writeHead(404);
                return res.end(JSON.stringify({ error: "Membro não encontrado" }));
            }

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(result.rows[0]));
        } catch (err) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

// Deletar membro
export const deletarMembro = async (req, res, id) => {
    try {
        const result = await pool.query("DELETE FROM membros WHERE id=$1 RETURNING *", [id]);

        if (!result.rows.length) {
            res.writeHead(404);
            return res.end(JSON.stringify({ error: "Membro não encontrado" }));
        }

        res.writeHead(200);
        res.end(JSON.stringify({ message: "Membro removido" }));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};
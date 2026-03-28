import { pool } from "../connection/db.js";

// Criar entrada
export const criarEntrada = async (req, res) => {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        try {
            const { descricao, valor, data_de_entrada, usuario_id } = JSON.parse(body);

            const result = await pool.query(
                "INSERT INTO entradas (descricao, valor, data, usuario_id) VALUES ($1,$2,$3,$4) RETURNING *",
                [descricao, valor, data_de_entrada, usuario_id]
            );

            res.writeHead(201);
            res.end(JSON.stringify(result.rows[0]));
        } catch (err) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

// Listar entradas
export const listarEntradas = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM entradas ORDER BY data DESC");

        res.writeHead(200);
        res.end(JSON.stringify(result.rows));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};

// Obter entrada
export const obterEntrada = async (req, res, id) => {
    try {
        const result = await pool.query("SELECT * FROM entradas WHERE id=$1", [id]);

        if (!result.rows.length) {
            res.writeHead(404);
            return res.end(JSON.stringify({ error: "Entrada não encontrada" }));
        }

        res.writeHead(200);
        res.end(JSON.stringify(result.rows[0]));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};

// Atualizar entrada
export const atualizarEntrada = async (req, res, id) => {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        try {
            const { descricao, valor, data_de_entrada, usuario_id } = JSON.parse(body);

            const result = await pool.query(
                "UPDATE entradas SET descricao=$1, valor=$2, data=$3, usuario_id=$4 WHERE id=$5 RETURNING *",
                [descricao, valor, data_de_entrada, usuario_id, id]
            );

            res.writeHead(200);
            res.end(JSON.stringify(result.rows[0]));
        } catch (err) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

// Deletar entrada
export const deletarEntrada = async (req, res, id) => {
    try {
        await pool.query("DELETE FROM entradas WHERE id=$1", [id]);

        res.writeHead(200);
        res.end(JSON.stringify({ message: "Entrada removida" }));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};
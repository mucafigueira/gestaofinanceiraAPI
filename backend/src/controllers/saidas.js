import { pool } from "../connection/db.js";

// Criar saída
export const criarSaida = async (req, res) => {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        try {
            const { descricao, valor, data_de_saida, usuario_id } = JSON.parse(body);

            const result = await pool.query(
                "INSERT INTO saidas (descricao, valor, data, usuario_id) VALUES ($1,$2,$3,$4) RETURNING *",
                [descricao, valor, data_de_saida, usuario_id]
            );

            res.writeHead(201);
            res.end(JSON.stringify(result.rows[0]));
        } catch (err) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

// Listar saídas
export const listarSaidas = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM saidas ORDER BY data DESC");

        res.writeHead(200);
        res.end(JSON.stringify(result.rows));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};

// Obter saída
export const obterSaida = async (req, res, id) => {
    try {
        const result = await pool.query("SELECT * FROM saidas WHERE id=$1", [id]);

        res.writeHead(200);
        res.end(JSON.stringify(result.rows[0]));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};

// Atualizar saída
export const atualizarSaida = async (req, res, id) => {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        try {
            const { descricao, valor, data_de_saida, usuario_id } = JSON.parse(body);

            const result = await pool.query(
                "UPDATE saidas SET descricao=$1, valor=$2, data=$3, usuario_id=$4 WHERE id=$5 RETURNING *",
                [descricao, valor, data_de_saida, usuario_id, id]
            );

            res.writeHead(200);
            res.end(JSON.stringify(result.rows[0]));
        } catch (err) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

// Deletar saída
export const deletarSaida = async (req, res, id) => {
    try {
        await pool.query("DELETE FROM saidas WHERE id=$1", [id]);

        res.writeHead(200);
        res.end(JSON.stringify({ message: "Saída removida" }));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};
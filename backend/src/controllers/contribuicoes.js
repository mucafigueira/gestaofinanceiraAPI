import { pool } from "../connection/db.js";

// Criar contribuição
export const criarContribuicao = async (req, res) => {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        try {
            const { membro_id, entrada_id, valor } = JSON.parse(body);

            const result = await pool.query(
                "INSERT INTO contribuicoes (membro_id, entrada_id, valor) VALUES ($1,$2,$3) RETURNING *",
                [membro_id, entrada_id, valor]
            );

            res.writeHead(201);
            res.end(JSON.stringify(result.rows[0]));
        } catch (err) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

// Listar contribuições
export const listarContribuicoes = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM contribuicoes");

        res.writeHead(200);
        res.end(JSON.stringify(result.rows));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};

// Obter contribuição
export const obterContribuicao = async (req, res, id) => {
    try {
        const result = await pool.query("SELECT * FROM contribuicoes WHERE id=$1", [id]);

        res.writeHead(200);
        res.end(JSON.stringify(result.rows[0]));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};

// Atualizar contribuição
export const atualizarContribuicao = async (req, res, id) => {
    let body = "";
    req.on("data", chunk => body += chunk.toString());

    req.on("end", async () => {
        try {
            const { membro_id, entrada_id, valor, data_de_contribuicao } = JSON.parse(body);

            const result = await pool.query(
                "UPDATE contribuicoes SET membro_id=$1, entrada_id=$2, valor=$3, data=$4 WHERE id=$5 RETURNING *",
                [membro_id, entrada_id, valor, data_de_contribuicao, id]
            );

            res.writeHead(200);
            res.end(JSON.stringify(result.rows[0]));
        } catch (err) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

// Deletar contribuição
export const deletarContribuicao = async (req, res, id) => {
    try {
        await pool.query("DELETE FROM contribuicoes WHERE id=$1", [id]);

        res.writeHead(200);
        res.end(JSON.stringify({ message: "Contribuição removida" }));
    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};
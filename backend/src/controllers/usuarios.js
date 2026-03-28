// controllers/usuarios.js
import { pool } from "../connection/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Função para cadastrar usuário
export const cadastrarUsuario = async (req, res) => {
    let body = "";

    // Ler dados do POST
    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", async () => {
        const { name, email, password } = JSON.parse(body);

        // Criptografar senha
        const hashPassword = await bcrypt.hash(password, 10);

        try {
            const result = await pool.query(
                "INSERT INTO usuarios (name, email, password) VALUES ($1,$2,$3) RETURNING id, name, email",
                [name, email, hashPassword]
            );
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ usuario: result.rows[0] }));
        } catch (err) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};

// Função de login
export const loginUsuario = async (req, res) => {
    let body = "";

    req.on("data", chunk => {
        body += chunk.toString();
    });

    req.on("end", async () => {
        const { email, password } = JSON.parse(body);

        try {
            const result = await pool.query("SELECT * FROM usuarios WHERE email=$1", [email]);
            if (result.rows.length === 0) {
                res.writeHead(401, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Usuário não encontrado" }));
            }

            const usuario = result.rows[0];

            // Comparar senha
            const passwordValida = await bcrypt.compare(password, usuario.password);
            if (!passwordValida) {
                res.writeHead(401, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Senha incorreta" }));
            }

            // Criar token JWT
            const token = jwt.sign({ id: usuario.id, name: usuario.nome }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ token }));
        } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: err.message }));
        }
    });
};
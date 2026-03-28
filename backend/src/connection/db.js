// db.js
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

// Carregar variáveis do .env
dotenv.config();

// Criar pool de conexões usando apenas DATABASE_URL
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// Testar conexão
pool.connect()
    .then(() => console.log("Conectado ao PostgreSQL"))
    .catch(err => console.error("Erro conexão DB", err));




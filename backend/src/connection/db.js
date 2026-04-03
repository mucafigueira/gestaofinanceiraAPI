// db.js
import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

// Carregar variáveis do .env
dotenv.config();

// Criar pool de conexões usando apenas DATABASE_URL
export const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // Necessário para conexões seguras, especialmente em produção

    max: 10, //maximo de conexões no pool
    idleTimeoutMillis: 30000, //fechar conexões inativas após 30 segundos,
    connectionTimeoutMillis: 5000, //tempo máximo para tentar conectar antes de dar timeout

});



/// Lidar com erros de conexão sem crashar o servidor
pool.on("error", (err) => {
    console.error("Erro de conexões", err);
});

// Testar conexão
pool.connect()
    .then(() => console.log("Conectado ao PostgreSQL"))
    .catch(err => console.error("Erro conexão DB", err));




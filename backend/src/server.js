// server.js
import http from "http";
import dotenv from "dotenv";
import { router } from "./routes/index.js"  //"./routes/index.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

// Criar servidor HTTP
const server = http.createServer((req, res) => {

    // Activação do cors para permitir usar o API
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Permitir preflight (IMPORTANTE)
    if (req.method === "OPTIONS") {
        res.writeHead(200);
        return res.end();
    }

    // Todas as requisições passam pelo router
    router(req, res);
});

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
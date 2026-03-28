// server.js
import http from "http";
import dotenv from "dotenv";
import { router } from "./routes/index.js"             //"./routes/index.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

// Criar servidor HTTP
const server = http.createServer((req, res) => {
    // Todas as requisições passam pelo router
    router(req, res);
});

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
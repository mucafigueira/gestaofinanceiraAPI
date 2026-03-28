import { cadastrarUsuario, loginUsuario } from "../controllers/usuarios.js"


export const usuariosRouter = (req, res) => {

    if (req.url === "/usuarios/cadastrar" && req.method === "POST") {
        cadastrarUsuario(req, res);
    } else if (req.url === "/usuarios/login" && req.method === "POST") {
        loginUsuario(req, res);
    } else {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Rota de usuário não encontrado" }))
    }
};
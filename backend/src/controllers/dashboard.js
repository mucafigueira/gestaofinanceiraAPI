import { pool } from "../connection/db.js";

/**
 *  Controlo do dashboard 
 * esta função retorna todos os totais ja calculada
 */

export const getDashboard = async (req, res) => {
    try {
        //Total de entradas
        const entradas = await pool.query(
            "SELECT COALESCE(SUM(valor),0) AS total FROM entradas"
        );

        //Total de Saídas
        const saidas = await pool.query(
            "SELECT COALESCE(SUM(valor),0) AS total FROM saidas"
        );

        //total de contribuições
        const contribuicoes = await pool.query(
            "SELECT COUNT(*) AS total FROM contribuicoes"
        );

        //total de  membros
        const membros = await pool.query(
            "SELECT COUNT(*) AS total FROM membros"
        );

        //Converter os valores entradas, saídas, contribuições em número
        const totalEntradas = Number(entradas.rows[0].total);
        const totalSaidas = Number(saidas.rows[0].total);
        const totalContribuicoes = Number(contribuicoes.rows[0].total);
        const totalMembros = Number(membros.rows[0].total);

        //Calcular saldo
        const saldo = totalEntradas - totalSaidas;

        //Quem não contribuiu
        const naoContribuicoes = totalMembros - totalContribuicoes;

        //Resposta final 
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({
            totalEntradas,
            totalSaidas,
            saldo,
            contribuicoes: totalContribuicoes, naoContribuicoes
        }))

    } catch (err) {
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
    }
};
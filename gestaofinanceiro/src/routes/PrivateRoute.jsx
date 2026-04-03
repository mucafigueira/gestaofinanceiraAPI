
import { Navigate } from "react-router-dom";

/**
 * Verifica se o usuário está logado
 */
export default function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");

    // Se não tiver token → manda para login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Se tiver token → mostra conteúdo
    return children;
};


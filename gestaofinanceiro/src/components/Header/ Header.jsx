
/**
 * Cabeçalho do dashboard
 * Importar em Dashboard.jsx
 */
export default function Header() {

    const logout = () => {
        localStorage.removeItem("token"); // remove token
        window.location.href = "/login";  // redireciona
    };

    return (
        <header className="bg-white shadow p-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-accent">Dashboard</h2>
            <button onClick={logout} className="btn btn-lg text-white btn-accent">
                Sair
            </button>
        </header>
    );
};

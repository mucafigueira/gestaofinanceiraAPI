import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/ Header";
import DashboardCard from "../components/DashboardCard/DashboardCard";

/**
 * Dashboard conectado ao backend
 * Vai mostrar: Total Entradas, Total Saídas, Contribuições, Não Contribuíram
 */
export default function Dashboard() {
    // Estado para armazenar os dados
    const [dados, setDados] = useState({
        totalEntradas: 0,
        totalSaidas: 0,
        contribuicoes: 0,
        naoContribuicoes: 0

    })

    // Buscar dados do backend quando o componente carregar
    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchDashboard = async () => {
            try {
                const res = await fetch("http://localhost:5000/dashboard", {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const data = await res.json();
                setDados(data)

            } catch (err) {
                console.log(err);
            }
        };
        fetchDashboard()
    }, [])



    // Dados para os cards
    const stats = [
        { title: "Total Entradas", value: `${dados.totalEntradas} Kz`, color: "bg-green-500" },
        { title: "Total Saídas", value: `${dados.totalSaidas} Kz`, color: "bg-red-500" },
        { title: "Contribuições", value: `${dados.contribuicoes}`, color: "bg-blue-500" },
        { title: "Não Contribuíram", value: `${dados.naoContribuicoes}`, color: "bg-yellow-500" },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <DashboardCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            color={stat.color}
                        />
                    ))}
                </main>
            </div>
        </div>
    );
};


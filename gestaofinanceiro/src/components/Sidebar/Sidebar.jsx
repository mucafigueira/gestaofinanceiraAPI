

import React from 'react'

export default function Sidebar() {
    return (
        <div className="w-64 bg-accent shadow-lg min-h-screen p-5 hidden md:block">
            <h1 className="text-2xl font-bold mb-8">Gestão Financeira</h1>
            <ul className="space-y-4">
                <li>
                    <a href="#" className="btn btn-ghost w-full justify text-lg text-left">Dashboard</a>
                </li>
                <li>
                    <a href="#" className="btn btn-ghost w-full justify text-lg text-left">Membros</a>
                </li>
                <li>
                    <a href="#" className="btn btn-ghost w-full justify text-lg text-left">Entradas</a>
                </li>
                <li>
                    <a href="#" className="btn btn-ghost w-full justify text-lg text-left">Saídas</a>
                </li>
                <li>
                    <a href="#" className="btn btn-ghost w-full justify text-lg text-left">Contribuições</a>
                </li>
            </ul>
        </div>
    );
}



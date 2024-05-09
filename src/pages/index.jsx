import { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Importar o ícone de pesquisa
import api from "../api"; // Importar o módulo da API
import "./style.css";
import "./index.css";

function App() {
    const [input, setInput] = useState("");
    const [cep, setCep] = useState({});

    async function handleSearch() {
        // 01310930/json

        if (input === "") {
            alert("Preencha algum cep!");
            return;
        }

        try {
            const response = await api.get(`${input}/json`);
            setCep(response.data);
            setInput("");
        } catch {
            alert("Ops erro ao buscar");
            setInput("");
        }
    }

    return (
        <div className="min-h-screen flex justify-center items-center flex-col bg-gradient-to-r from-slate-950 to-slate-800">
            <h1 className="title text-white text-7xl animate-flipTitle">
                Buscador CEP
            </h1>

            <div className="containerInput">
                <input
                    type="text"
                    placeholder="Digite seu cep..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button className="buttonSearch" onClick={handleSearch}>
                    <FiSearch size={25} color="#FFF" />
                </button>
            </div>

            {Object.keys(cep).length > 0 && (
                <main className="main">
                    <h2>CEP: {cep.cep}</h2>

                    <span>{cep.logradouro}</span>
                    <span>Complemento: {cep.complemento}</span>
                    <span>{cep.bairro}</span>
                    <span>
                        {cep.localidade} - {cep.uf}
                    </span>
                </main>
            )}
        </div>
    );
}

export default App;

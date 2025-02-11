import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { buscarJuegos } from "../Servicios/apiJuegos"; // Asumiendo que esta función devuelve los resultados

const SearchBar = () => {
    const [query, setQuery] = useState(""); // Estado para la búsqueda
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return; // Evita enviar una búsqueda vacía

        try {
            const juegos = await buscarJuegos(query); // Realiza la búsqueda
            // Redirige a MostrarBusqueda pasando los resultados con el state
            navigate(`/search/${query}`, { state: { results: juegos } });
        } catch (error) {
            console.error("Error al buscar juegos:", error);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center border rounded-full overflow-hidden">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar..."
                className="px-4 py-2 w-full outline-none"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Buscar</button>
        </form>
    );
};

export default SearchBar;

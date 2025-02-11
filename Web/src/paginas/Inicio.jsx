import { useEffect, useState } from "react";
import { obtenerJuegosPopulares } from "../Servicios/apiJuegos";
import TarjetaJuego from "../Componentes/TarjetaJuego";
import Carrousel from "../Componentes/Carrousel";
import SearchBar from "../Componentes/SearchBar";

const Inicio = () => {
    const [juegos, setJuegos] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        obtenerJuegosPopulares().then(setJuegos); // Carga los juegos populares al inicio
    }, []);

    const handleSearch = (data) => {
        setSearchResults(data); // Actualiza el estado con los resultados de búsqueda
    };

    // Si hay resultados de búsqueda, se usan. Si no, se usan los juegos populares.
    const juegosParaMostrar = searchResults.length > 0 ? searchResults : juegos;

    return (
        <div className="container mx-auto mt-8">
            {/* Carrousel destacado */}
            <Carrousel />
            
            {/* Sección para la búsqueda */}
            <div className="text-center my-8">
                <h2 className="text-2xl font-semibold mb-4">¿Estás buscando un juego en particular?</h2>
                <p className="text-gray-600 mb-4">
                    Usa la barra de búsqueda para encontrar tu juego favorito o explora los títulos más populares.
                </p>
                <SearchBar onSearch={handleSearch} />
            </div>

            {/* Títulos de los juegos dependiendo de la búsqueda */}
            <h2 className="text-3xl font-bold mb-6 text-center">
                Juegos {searchResults.length > 0 ? "Encontrados" : "Populares"}
            </h2>

            {/* Si no hay resultados de búsqueda, mostramos los juegos populares */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {juegosParaMostrar.length > 0 ? (
                    juegosParaMostrar.map((juego) => (
                        <TarjetaJuego key={juego.id} juego={juego} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No se encontraron juegos. Intenta con otra búsqueda.</p>
                )}
            </div>
        </div>
    );
};

export default Inicio;

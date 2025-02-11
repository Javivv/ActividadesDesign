import { useEffect, useState } from "react";
import { obtenerJuegosPopulares } from "../Servicios/apiJuegos";
import TarjetaJuego from "../Componentes/TarjetaJuego";

import SearchBar from "../Componentes/SearchBar";

const Explorar = () => {
    const [juegos, setJuegos] = useState([]);

    useEffect(() => {
        obtenerJuegosPopulares().then(setJuegos);
    }, []);

    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (data) => {
      setSearchResults(data); // Actualiza el estado con los resultados de búsqueda
    };

    // Si hay resultados de búsqueda, usarlos. Si no, usar los juegos populares.
    const juegosParaMostrar = searchResults.length > 0 ? searchResults : juegos;

    return (
        <div className="container mx-auto mt-8">
            <SearchBar onSearch={handleSearch} />
            <br />
            <h2 className="text-3xl font-bold mb-4">Juegos {searchResults.length > 0 ? "Encontrados" : "Populares"}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {juegosParaMostrar.map(juego => (
                    <TarjetaJuego key={juego.id} juego={juego} />
                ))}
            </div>
        </div>
    );
};

export default Explorar;

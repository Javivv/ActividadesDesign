import { useEffect, useState } from "react";
import { obtenerPublishers } from "../Servicios/apiJuegos";
import TarjetaPublisher from "../Componentes/TarjetaPublisher";
import SearchBar from "../Componentes/SearchBar";

const Desarrolladores = () => {
    const [publishers, setPublishers] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        obtenerPublishers().then(setPublishers); // Carga los publishers al inicio
    }, []);

    const handleSearch = (data) => {
        setSearchResults(data); // Actualiza el estado con los resultados de búsqueda
    };

    // Si hay resultados de búsqueda, se usan. Si no, se usan los publishers cargados.
    const publishersParaMostrar = searchResults.length > 0 ? searchResults : publishers;

    return (
        <div className="container mx-auto mt-8">
            <div className="text-center my-8">
                <h2 className="text-2xl font-semibold mb-4">¿Buscas un Publisher en particular?</h2>
                <p className="text-gray-600 mb-4">
                    Usa la barra de búsqueda para encontrar publishers o explora los más populares.
                </p>
                <SearchBar onSearch={handleSearch} />
            </div>

            <h2 className="text-3xl font-bold mb-6 text-center">
                Publishers {searchResults.length > 0 ? "Encontrados" : "Populares"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {publishersParaMostrar.length > 0 ? (
                    publishersParaMostrar.map((publisher) => (
                        <TarjetaPublisher key={publisher.id} publisher={publisher} />
                    ))
                ) : (
                    <p className="text-center text-gray-500">No se encontraron publishers. Intenta con otra búsqueda.</p>
                )}
            </div>
        </div>
    );
};

export default Desarrolladores;

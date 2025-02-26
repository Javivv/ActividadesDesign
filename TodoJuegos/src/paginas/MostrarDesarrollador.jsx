import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import TarjetaJuego from "../Componentes/TarjetaJuego"
import SearchBar from "../Componentes/SearchBar"
import { obtenerJuegosDelPublisher, buscarPublisher } from "../Servicios/apiJuegos"

const MostrarDesarrollador = () => {
    const { id } = useParams(); // Obtiene el parámetro id de la URL
    const location = useLocation()
    const [publisher, setPublisher] = useState([]); // Estado para el publisher
    // const publisher = location.state?.results || buscarPublisher(id);
    const [juegos, setJuegos] = useState([])
    const [searchResults, setSearchResults] = useState([])

    useEffect(() => {
        const fetchPublisher = async () => {
            let publisherData;
            if (location.state?.results) {
                publisherData = location.state.results;
            } else {
                publisherData = await buscarPublisher(id);
            }
    
            setPublisher(publisherData);
    
            if (publisherData) {
                obtenerJuegosDelPublisher(publisherData.id).then(setJuegos);
            }
        };
    
        fetchPublisher();
    }, [id, location.state]);

    const handleSearch = (data) => {
        setSearchResults(data)
    }

    const juegosParaMostrar = searchResults.length > 0 ? searchResults : juegos

    if (!publisher) {
        return <p className="text-center text-gray-500">No se encontró información del publisher.</p>
    }

    return (
        <div className="container mx-auto mt-8 px-4">
        <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{publisher.name}</h1>
            <img
            src={publisher.image_background || "/placeholder.svg"}
            alt={publisher.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-lg mb-2" dangerouslySetInnerHTML={{ __html: publisher.description }}></p>
            <p className="text-lg font-semibold">Total de Juegos: {publisher.games_count}</p>
        </div>

        <div className="text-center my-8">
            <h2 className="text-2xl font-semibold mb-4">¿Buscas un juego específico de {publisher.name}?</h2>
            <p className="text-gray-600 mb-4">
            Usa la barra de búsqueda para encontrar tu juego favorito o explora todos los títulos.
            </p>
            <SearchBar onSearch={handleSearch} />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center">
            Juegos de {publisher.name} {searchResults.length > 0 ? "Encontrados" : ""}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {juegosParaMostrar.length > 0 ? (
            juegosParaMostrar.map((juego) => <TarjetaJuego key={juego.id} juego={juego} />)
            ) : (
            <p className="text-center text-gray-500">No se encontraron juegos. Intenta con otra búsqueda.</p>
            )}
        </div>
        </div>
    )
}

export default MostrarDesarrollador

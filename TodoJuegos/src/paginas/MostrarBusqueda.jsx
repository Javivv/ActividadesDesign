import { useLocation, useParams } from "react-router-dom";
import TarjetaJuego from "../Componentes/TarjetaJuego";
import SearchBar from "../Componentes/SearchBar";


const MostrarBusqueda = () => {
    const { query } = useParams(); // Obtiene la query desde la URL
    const location = useLocation();
    const searchResults = location.state?.results || []; // Obtiene los resultados pasados desde SearchBar

    console.log(location.state);

    return (
        <>
        <SearchBar />
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-4">
                {searchResults.length > 0 ? `Resultados de la búsqueda: "${decodeURIComponent(query)}"` : "No se encontraron juegos"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {searchResults.map(juego => (
                    <TarjetaJuego key={juego.id} juego={juego} /> // Muestra cada tarjeta
                ))}
            </div>
        </div>
        </>
    );
};

export default MostrarBusqueda;

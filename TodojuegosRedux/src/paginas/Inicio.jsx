import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularGames, searchGames } from "../slices/gamesSlice";
import TarjetaJuego from "../Componentes/TarjetaJuego";
import Carrousel from "../Componentes/Carrousel";
import SearchBar from "../Componentes/SearchBar";

const Inicio = () => {
    const dispatch = useDispatch();
    const { popularGames = [], searchResults = [], status, error } = useSelector((state) => state.games);

    useEffect(() => {
        dispatch(fetchPopularGames()); 
    }, [dispatch]);

    const handleSearch = (query) => {
        dispatch(searchGames(query));
    };

    const juegosParaMostrar = searchResults.length > 0 ? searchResults : popularGames;

    return (
        <div className="container mx-auto mt-8">
            <Carrousel />
            
            <div className="text-center my-8">
                <h2 className="text-2xl font-semibold mb-4">¿Estás buscando un juego en particular?</h2>
                <p className="text-gray-600 mb-4">
                    Usa la barra de búsqueda para encontrar tu juego favorito o explora los títulos más populares.
                </p>
                <SearchBar onSearch={handleSearch} />
            </div>

            <h2 className="text-3xl font-bold mb-6 text-center">
                Juegos {searchResults.length > 0 ? "Encontrados" : "Populares"}
            </h2>

            {status === "loading" && <p className="text-center">Cargando juegos...</p>}
            {error && <p className="text-center text-red-500">Error: {error}</p>}

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

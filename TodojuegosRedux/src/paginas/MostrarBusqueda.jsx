import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchGames } from "../slices/gamesSlice";
import { setSortField } from "../slices/sortSlice";
import TarjetaJuego from "../Componentes/TarjetaJuego";
import SearchBar from "../Componentes/SearchBar";

const MostrarBusqueda = () => {
    const { query } = useParams();
    const dispatch = useDispatch();
    
    const searchResults = useSelector((state) => {
        if (state.platforms.status === "succeeded") return state.platforms.games;
        if (state.genres.status === "succeeded") return state.genres.games;
        return state.games.searchResults;
    });
    
    
    const sortField = useSelector((state) => state.sort.sortField);

    useEffect(() => {
        if (query) {
            dispatch(searchGames({ query, ordering: sortField }));
        }
    }, [dispatch, query, sortField]);

    return (
        <>
            <SearchBar />
            <div className="container mx-auto mt-8">
                <h2 className="text-3xl font-bold mb-4">
                    {searchResults.length > 0
                        ? `Resultados de la búsqueda: "${decodeURIComponent(query)}"`
                        : "No se encontraron juegos"}
                </h2>

                <div className="mb-4">
                    <select
                        value={sortField}
                        onChange={(e) => dispatch(setSortField(e.target.value))}
                        className="border border-gray-300 p-2 rounded-md"
                    >
                        <option value="name">Nombre (A-Z)</option>
                        <option value="-name">Nombre (Z-A)</option>
                        <option value="released">Fecha de lanzamiento (Asc.)</option>
                        <option value="-released">Fecha de lanzamiento (Desc.)</option>
                        <option value="rating">Rating (Asc.)</option>
                        <option value="-rating">Rating (Desc.)</option>
                        <option value="metacritic">Metacritic (Asc.)</option>
                        <option value="-metacritic">Metacritic (Desc.)</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {searchResults.map((juego) => (
                        <TarjetaJuego key={juego.id} juego={juego} />
                    ))}
                </div>
            </div>
        </>
    );
};

export default MostrarBusqueda;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularGamesPagination, setPage } from "../slices/gamesSlice";
import TarjetaJuego from "../Componentes/TarjetaJuego";
import SearchBar from "../Componentes/SearchBar";

const Explorar = () => {
  const dispatch = useDispatch();
  const {
    popularGames = [],
    status,
    error,
    currentPage,
    nextPage,
    previousPage,
  } = useSelector((state) => state.games);

  useEffect(() => {
    dispatch(fetchPopularGamesPagination(currentPage));
  }, [dispatch, currentPage]);

  if (status === "loading") return <p className="text-center">Cargando juegos...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto mt-8">
      <SearchBar />
      <h2 className="text-3xl font-bold mb-4">Juegos Populares</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {popularGames.length > 0 ? (
          popularGames.map((juego) => <TarjetaJuego key={juego.id} juego={juego} />)
        ) : (
          <p className="text-center text-gray-500">No se encontraron juegos.</p>
        )}
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          disabled={!previousPage}
          onClick={() => dispatch(setPage(currentPage - 1))}
        >
          Anterior
        </button>
        <span className="text-lg font-semibold">Página {currentPage}</span>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          disabled={!nextPage}
          onClick={() => dispatch(setPage(currentPage + 1))}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Explorar;

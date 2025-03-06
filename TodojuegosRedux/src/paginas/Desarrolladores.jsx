import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishers, searchPublishers } from "../slices/publishersSlice";
import TarjetaPublisher from "../Componentes/TarjetaPublisher";
import SearchBarPublishers from "../Componentes/SearchBarPublishers";

const Desarrolladores = () => {
  const dispatch = useDispatch();
  const { list: publishers = [], status, error, searchResults = [] } = useSelector((state) => state.publishers);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPublishers());
    }
  }, [status, dispatch]);

  const handleSearchPublishers = (query) => {
    dispatch(searchPublishers(query));
  };

  const publishersParaMostrar = searchResults.length > 0 ? searchResults : publishers;

  if (status === "loading") {
    return <p className="text-center">Cargando publishers...</p>;
  }

  if (status === "failed") {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="text-center my-8">
        <h2 className="text-2xl font-semibold mb-4">¿Buscas un Publisher en particular?</h2>
        <p className="text-gray-600 mb-4">Usa la barra de búsqueda para encontrar publishers o explora los más populares.</p>
        <SearchBarPublishers onSearch={handleSearchPublishers} />
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center">
        Publishers {searchResults.length > 0 ? "Encontrados" : "Populares"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {publishersParaMostrar.length > 0 ? (
          publishersParaMostrar.map((publisher) => <TarjetaPublisher key={publisher.id} publisher={publisher} />)
        ) : (
          <p className="text-center text-gray-500">No se encontraron publishers. Intenta con otra búsqueda.</p>
        )}
      </div>
    </div>
  );
};

export default Desarrolladores;

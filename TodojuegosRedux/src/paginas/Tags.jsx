import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TarjetaJuego from "../Componentes/TarjetaJuego";
import { searchByTag, fetchTagDetails } from "../slices/tagsSlice";

const MostrarPorTag = () => {
  const { tagId } = useParams(); // Obtenemos el tagId desde la URL
  const [tagName, setTagName] = useState(""); // Estado local para almacenar el nombre del tag
  const dispatch = useDispatch();
  const { games, status, error, tagDetails } = useSelector((state) => state.tags); // Obtenemos los datos del Redux store

  useEffect(() => {
    dispatch(searchByTag(tagId)); // Llamamos a la acción con el id del tag para obtener los juegos
    dispatch(fetchTagDetails(tagId)); // Llamamos a la acción para obtener los detalles del tag 
  }, [tagId, dispatch]);

  useEffect(() => {
    if (tagDetails) {
      setTagName(tagDetails.name); // Al obtener los detalles del tag, almacenamos su nombre
    }
  }, [tagDetails]);

  if (status === "loading") {
    return <p className="text-center text-gray-500">Cargando juegos...</p>;
  }

  if (status === "failed") {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center">Juegos relacionados con &quot;{tagName || "Cargando..." }&quot;</h2> 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {games.length > 0 ? (
          games.map((juego) => <TarjetaJuego key={juego.id} juego={juego} />)
        ) : (
          <p className="text-center text-gray-500">No se encontraron juegos.</p>
        )}
      </div>
    </div>
  );
};

export default MostrarPorTag;

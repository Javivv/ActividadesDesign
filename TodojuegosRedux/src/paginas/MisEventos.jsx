"use client";

import { useDispatch, useSelector } from "react-redux";
import { toggleSubscription } from "../slices/eventsSlice";

const MisEventos = () => {
  const dispatch = useDispatch();
  const { events, subscribedEvents, status, error } = useSelector((state) => state.events);

  const handleToggleSubscription = (eventId) => {
    dispatch(toggleSubscription(eventId));
  };

  if (status === "loading") return <p className="text-center text-gray-600">Cargando eventos...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error: {error}</p>;

  // Filtrar los eventos a los que el usuario está inscrito
  const eventosInscritos = events.filter((event) => subscribedEvents.includes(event.id));

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-4">Mis Eventos</h2>
      {eventosInscritos.length === 0 ? (
        <p className="text-gray-600">No estás inscrito en ningún evento.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventosInscritos.map((event) => (
            <li key={event.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-700 mb-2">{event.location}</p>
              <img
                src={`${event.image}`}
                alt={event.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <button
                onClick={() => handleToggleSubscription(event.id)}
                className="px-4 py-2 rounded-md mt-2 bg-red-500 text-white"
              >
                Cancelar asistencia
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MisEventos;

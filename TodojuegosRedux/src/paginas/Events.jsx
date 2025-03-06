"use client"

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadEvents, toggleSubscription } from "../slices/eventsSlice";
import QRCode from "qrcode"; // Importamos la librería para generar el QR

const Events = () => {
  const dispatch = useDispatch();
  const { events, subscribedEvents, status, error } = useSelector((state) => state.events);
  const [qrCode, setQrCode] = useState(""); // Estado para almacenar el QR generado

  useEffect(() => {
    if (status === "idle") {
      dispatch(loadEvents());
    }
  }, [status, dispatch]);

  const handleToggleSubscription = (eventId, eventTitle) => {
    dispatch(toggleSubscription(eventId));

    // Generar el QR cuando el usuario se apunta
    const qrData = `${window.location.origin}/event/${eventId}?title=${encodeURIComponent(eventTitle)}`; // URL del evento
    QRCode.toDataURL(qrData, (err, url) => {
      if (err) return console.error(err);
      setQrCode(url); // Establecer la URL generada como QR
      localStorage.setItem(`participation_${eventId}`, true); // Guardar la participación en localStorage
    });
  };

  if (status === "loading") return <p className="text-center text-gray-600">Cargando eventos...</p>;
  if (status === "failed") return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-4">Eventos de Videojuegos</h2>
      {events.length === 0 ? (
        <p className="text-gray-600">No hay eventos disponibles.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <li key={event.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-700 mb-2">{event.location}</p>
              <img
                src={`${event.image}`}
                alt={event.title}
                className="w-full h-40 object-cover rounded-lg mb-2"
              />
              <button
                onClick={() => handleToggleSubscription(event.id, event.title)}
                className={`px-4 py-2 rounded-md mt-2 ${
                  subscribedEvents.includes(event.id) ? "bg-red-500 text-white" : "bg-green-500 text-white"
                }`}
              >
                {subscribedEvents.includes(event.id) ? "Cancelar asistencia" : "Apuntarme"}
              </button>

              {subscribedEvents.includes(event.id) && qrCode && (
                <div className="mt-4">
                  <p>Comparte este QR con tus compañeros:</p>
                  <img src={qrCode} alt="QR para compartir evento" className="w-32 h-32" />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;

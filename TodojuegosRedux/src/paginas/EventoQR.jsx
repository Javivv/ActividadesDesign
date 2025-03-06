/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const EventoQR = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    const eventId = params.get("eventId");
    const title = params.get("title");

    if (eventId && title) {
      localStorage.setItem(`participation_${eventId}`, true);
      alert(`Te has unido al evento: ${title}`);
    }
  }, [location]);

  return (
    <div className="container">
      <h2>¡Felicidades!</h2>
      <p>Te has unido al evento correctamente. Puedes ver tus eventos en tu perfil.</p>
    </div>
  );
};

export default EventoQR;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerDetallesJuego } from "../Servicios/apiJuegos";

const DetalleJuego = () => {
    const { id } = useParams();
    const [juego, setJuego] = useState(null);
    const [favorito, setFavorito] = useState(false);
    
    useEffect(() => {
        obtenerDetallesJuego(id)
            .then(data => setJuego(data))
            .catch(error => console.error("Error al cargar el juego:", error));
    }, [id]);

    // Función para manejar el cambio de favorito
    const toggleFavorito = () => {
        setFavorito(prevState => {
            const newState = !prevState;
            // Guardar el estado del favorito en localStorage
            localStorage.setItem(id, newState);
            return newState;
        });
    };

    // Comprobar si el juego está marcado como favorito al cargar
    useEffect(() => {
        const isFavorito = localStorage.getItem(id) === 'true';
        setFavorito(isFavorito);
    }, [id]);

    if (!juego) {
        return <p className="text-center text-gray-600">Cargando detalles del juego...</p>;
    }

    return (
        <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold mb-4">{juego.name}</h2>
            <img 
                src={juego.background_image || "https://via.placeholder.com/600x400"} 
                alt={juego.name} 
                className="w-full max-h-96 object-cover rounded-lg mb-6"
            />
            
            <div className="mb-4">
                <p><strong>Fecha de lanzamiento:</strong> {juego.released || "No disponible"}</p>
                <p><strong>Calificación:</strong> {juego.rating ? juego.rating : "No disponible"}</p>
                <p><strong>Plataformas:</strong> {juego.platforms ? juego.platforms.map(p => p.platform.name).join(", ") : "No disponible"}</p>
                <p><strong>Géneros:</strong> {juego.genres ? juego.genres.map(g => g.name).join(", ") : "No disponible"}</p>
                <p><strong>Desarrollador:</strong> {juego.developers ? juego.developers.map(dev => dev.name).join(", ") : "No disponible"}</p>
                <p><strong>Editor:</strong> {juego.publishers ? juego.publishers.map(pub => pub.name).join(", ") : "No disponible"}</p>
            </div>

            <div className="mb-6">
                <p><strong>Descripción:</strong></p>
                <p>{juego.description_raw || "Sin descripción disponible."}</p>
            </div>

            <button 
                onClick={toggleFavorito} 
                className={`px-4 py-2 rounded-md ${favorito ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-700'}`}
            >
                {favorito ? "Quitar de favoritos" : "Marcar como favorito"}
            </button>
        </div>
    );
};

export default DetalleJuego;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerDetallesJuego, buscarPlataforma, buscarGenero, buscarPublisher } from "../Servicios/apiJuegos";

const DetalleJuego = () => {
    const { id } = useParams();
    const [juego, setJuego] = useState(null);
    const [favorito, setFavorito] = useState(false);
    const navigate = useNavigate();

    console.log(juego);
    useEffect(() => {
        obtenerDetallesJuego(id)
            .then(data => setJuego(data))
            .catch(error => console.error("Error al cargar el juego:", error));

    }, [id]);

    // Función para manejar el cambio de favorito
    const toggleFavorito = () => {
        setFavorito(prevState => {
            const newState = !prevState;
            localStorage.setItem(id, newState);
            return newState;
        });
    };

    // Comprobamos si el juego está marcado como favorito al cargar
    useEffect(() => {
        const isFavorito = localStorage.getItem(id) === 'true';
        setFavorito(isFavorito);

    }, [id]);

    if (!juego) {
        return <p className="text-center text-gray-600">Cargando detalles del juego...</p>;
    }


    const handlePlataformas = async (e) => {

        console.log(e.target.id);
        
        try {
            const plataforma = await buscarPlataforma(e.target.id)

            const nombrePlataforma = encodeURIComponent(e.target.textContent); // Me daba error la / de la Xbox serie X/Y en las rutas

            navigate(`/search/${nombrePlataforma}`, { state: { results: plataforma } });

        } catch (error) {
            console.error("Error al buscar juegos:", error);
        }
    }

    const handleGeneros = async (e) => {
        try {
            const genero = await buscarGenero(e.target.textContent.toLowerCase()); // Si tiene mayúsculas no lo encuentra
            
    
            navigate(`/search/${e.target.textContent}`, { state: { results: genero } });
    
        } catch (error) {
            console.error("Error al buscar juegos por género:", error);
        }
    };

    const handlePublisher = async (e) => {

        console.log(e.target.id);
        try {
            const publisher = await buscarPublisher(e.target.id); // Si tiene mayúsculas no lo encuentra

            console.log(publisher);
    
            navigate(`/publisher/${e.target.id}`, { state: { results: publisher } });
    
        } catch (error) {
            console.error("Error al buscar juegos por publisher:", error);
        }
    };

    

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
                <p><strong>Plataformas:</strong>{" "}
                {juego.platforms
                    ? juego.platforms.map((p, index) => (
                        <span key={index} id={p.platform.id} className="plataforma-item" onClick={(e) => handlePlataformas(e)} style={{ cursor: "pointer", marginRight: "5px", color: "blue", textDecoration: "underline" }}>
                        {p.platform.name}
                        </span>))
                    : "No disponible"}</p>
                <p><strong>Géneros:</strong>{" "}
                {juego.genres
                    ? juego.genres.map((g, index) => (
                        <span key={index} className="genero-item" onClick={(e) => handleGeneros(e)} style={{ cursor: "pointer", marginRight: "5px", color: "blue", textDecoration: "underline" }}>
                            {g.name}
                        </span>
                    ))
                    : "No disponible"}
                </p>

                <p><strong>Desarrollador:</strong>{" "}
                {juego.publishers
                    ? juego.publishers.map((dev, index) => (
                        <span key={index} id={dev.id} className="desarrollador-item" onClick={(e) => handlePublisher(e)} style={{ cursor: "pointer", marginRight: "5px", color: "blue", textDecoration: "underline" }}>
                            {dev.name}
                        </span>
                    ))
                    : "No disponible"}
            </p>

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

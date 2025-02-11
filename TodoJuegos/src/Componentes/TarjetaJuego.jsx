import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const TarjetaJuego = ({ juego }) => {
    if (!juego) {
        return <p className="text-red-500 text-center">Error al cargar el juego.</p>;
    }

    return (
        <div className="border border-gray-200 rounded-lg p-4 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 bg-white">
            <div className="relative">
                <img 
                    src={juego.background_image || "https://via.placeholder.com/300x200"} 
                    alt={juego.name || "Juego sin nombre"} 
                    className="w-full h-40 object-cover rounded-md"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-30 rounded-md"></div>
            </div>

            <h2 className="text-xl font-semibold mt-4 text-center text-gray-900">{juego.name || "Nombre no disponible"}</h2>

            <p className="text-sm text-center text-gray-500 mt-1">Calificación: {juego.rating !== undefined ? juego.rating : "No disponible"}</p>

            <Link 
                to={`/juego/${juego.id}`} 
                className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md w-full text-center transition-colors duration-300"
            >
                Ver más
            </Link>
        </div>
    );
};

TarjetaJuego.propTypes = {
    juego: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        background_image: PropTypes.string,
        rating: PropTypes.number
    }).isRequired
};

export default TarjetaJuego;

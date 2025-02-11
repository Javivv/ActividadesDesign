const ApiKey = "5575cf21dff14fb798e8820db63e283b";

export const obtenerJuegosPopulares = async () => {
    try {
        const respuesta = await fetch(`https://api.rawg.io/api/games?key=${ApiKey}`);
        if (!respuesta.ok) {
            throw new Error("Error al obtener los juegos");
        }
        const datos = await respuesta.json();
        return datos.results;
    } catch (error) {
        console.error("Error en la solicitud de juegos:", error);
        return [];
    }
};

export const buscarJuegos = async (consulta) => {
    try {
        const respuesta = await fetch(`https://api.rawg.io/api/games?key=${ApiKey}&search=${consulta}`);
        if (!respuesta.ok) {
            throw new Error("Error al buscar juegos");
        }
        const datos = await respuesta.json();
        return datos.results;
    } catch (error) {
        console.error("Error en la búsqueda de juegos:", error);
        return [];
    }
};

export const obtenerDetallesJuego = async (idJuego) => {
    try {
        const respuesta = await fetch(`https://api.rawg.io/api/games/${idJuego}?key=${ApiKey}`);
        if (!respuesta.ok) {
            throw new Error("Error al obtener los detalles del juego");
        }
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Error al obtener detalles del juego:", error);
        return null;
    }
};

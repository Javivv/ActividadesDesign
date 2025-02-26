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
export const obtenerPublishers = async () => {
    try {
        const respuesta = await fetch(`https://api.rawg.io/api/publishers?key=${ApiKey}`);
        if (!respuesta.ok) {
            throw new Error("Error al obtener los desarrolladores");
        }
        const datos = await respuesta.json();
        return datos.results;
    } catch (error) {
        console.error("Error en la solicitud de desarrolladores:", error);
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

export const buscarPlataforma = async (namePlatform) => {
    try {
        const respuesta = await fetch(`https://api.rawg.io/api/games?key=${ApiKey}&platforms=${namePlatform}`);
        if (!respuesta.ok) {
            throw new Error("Error al buscar la plataforma");
        }
        const datos = await respuesta.json();
        console.log(datos);
        return datos.results;
    } catch (error) {
        console.error("Error en la búsqueda de plataformas:", error);
        return [];
    }
};

export const buscarGenero = async (nameGenero) => {
    try {
        const respuesta = await fetch(`https://api.rawg.io/api/games?key=${ApiKey}&genres=${nameGenero}`);
        if (!respuesta.ok) {
            throw new Error("Error al buscar el genero");
        }
        const datos = await respuesta.json();
        console.log(datos);
        return datos.results;
    } catch (error) {
        console.error("Error en la búsqueda de genero:", error);
        return [];
    }
};

export const buscarPublisher = async (idPublisher) => {
    try {
        const respuesta = await fetch(`https://api.rawg.io/api/publishers/${idPublisher}?key=${ApiKey}`);
        if (!respuesta.ok) {
            throw new Error("Error al buscar el desarrollador");
        }
        const datos = await respuesta.json();
        console.log(datos);
        return datos;
    } catch (error) {
        console.error("Error en la búsqueda de desarrollador:", error);
        return [];
    }
};


export const obtenerJuegosDelPublisher = async (namePublisher) => {
    try {
        const respuesta = await fetch(`https://api.rawg.io/api/games?key=${ApiKey}&publishers=${namePublisher}`);
        if (!respuesta.ok) {
            throw new Error("Error al buscar el desarrollador");
        }
        const datos = await respuesta.json();
        console.log(datos);
        return datos.results;
    } catch (error) {
        console.error("Error en la búsqueda de desarrollador:", error);
        return [];
    }
};
"use client"

import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import TarjetaJuego from "../Componentes/TarjetaJuego"
import SearchBar from "../Componentes/SearchBar"
import { fetchPublisherDetails, fetchPublisherGames } from "../slices/publishersSlice"

const MostrarDesarrollador = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const { details: developer, games, status, error } = useSelector((state) => state.publishers)

    useEffect(() => {
        dispatch(fetchPublisherDetails(id))
        dispatch(fetchPublisherGames(id))
    }, [id, dispatch])

    if (status === "loading") {
        return <p className="text-center text-gray-500">Cargando información...</p>
    }

    if (status === "failed") {
        return <p className="text-center text-red-500">Error al cargar los datos: {error}</p>
    }

    if (!developer) {
        return <p className="text-center text-gray-500">No se encontró información del desarrollador.</p>
    }

    return (
        <div className="container mx-auto mt-8 px-4">
        <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{developer.name}</h1>
            <img
            src={developer.image_background || "/placeholder.svg"}
            alt={developer.name}
            className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <p className="text-lg mb-2" dangerouslySetInnerHTML={{ __html: developer.description }}></p>
            <p className="text-lg font-semibold">Total de Juegos: {developer.games_count}</p>
        </div>

        <div className="text-center my-8">
            <h2 className="text-2xl font-semibold mb-4">¿Buscas un juego específico de {developer.name}?</h2>
            <p className="text-gray-600 mb-4">
            Usa la barra de búsqueda para encontrar tu juego favorito o explora todos los títulos.
            </p>
            <SearchBar />
        </div>

        <h2 className="text-3xl font-bold mb-6 text-center">Juegos de {developer.name}</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.length > 0 ? (
            games.map((juego) => <TarjetaJuego key={juego.id} juego={juego} />)
            ) : (
            <p className="text-center text-gray-500">No se encontraron juegos.</p>
            )}
        </div>
        </div>
    )
    }

export default MostrarDesarrollador


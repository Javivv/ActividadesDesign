"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchGameDetails } from "../slices/gamesSlice"
import { searchByPlatform } from "../slices/platformsSlice"
import { searchByGenre } from "../slices/genresSlice"
import { fetchPublisherDetails } from "../slices/publishersSlice"
import { searchByTag } from "../slices/tagsSlice"

const DetalleJuego = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // Evita errores cuando gameDetails no ha cargado aún
  const { gameDetails: juego = {}, status, error } = useSelector((state) => state.games)

  const [favorito, setFavorito] = useState(false)

  useEffect(() => {
    console.log("Cargando detalles del juego con ID:", id);
    dispatch(fetchGameDetails(id));
  }, [id, dispatch]);
  

  useEffect(() => {
    const isFavorito = localStorage.getItem(id) === "true"
    setFavorito(isFavorito)
  }, [id])

  const toggleFavorito = () => {
    setFavorito((prevState) => {
      const newState = !prevState
      localStorage.setItem(id, newState)
      return newState
    })
  }

  const handlePlataformas = async (platformId, platformName) => {
    try {
        console.log("Buscando juegos para la plataforma:", platformId);
        await dispatch(searchByPlatform(platformId)).unwrap();
        navigate(`/search/${encodeURIComponent(platformName)}`);
    } catch (error) {
        console.error("Error al buscar juegos:", error);
    }
};


  const handleGeneros = async (genreName) => {
    try {
      await dispatch(searchByGenre(genreName.toLowerCase())).unwrap()
      navigate(`/search/${genreName}`)
    } catch (error) {
      console.error("Error al buscar juegos por género:", error)
    }
  }

  const handleTags = async (tagId) => {
    try {
      await dispatch(searchByTag(tagId)).unwrap()
      navigate(`/search/tags/${tagId}`)
    } catch (error) {
      console.error("Error al buscar juegos por tag:", error)
    }
  }

  const handlePublisher = async (publisherId) => {
    try {
      await dispatch(fetchPublisherDetails(publisherId)).unwrap()
      navigate(`/publisher/${publisherId}`)
    } catch (error) {
      console.error("Error al buscar juegos por publisher:", error)
    }
  }

  if (status === "loading") {
    return <p className="text-center text-gray-600">Cargando detalles del juego...</p>
  }

  if (status === "failed") {
    return <p className="text-center text-red-500">Error: {error}</p>
  }

  if (!juego || Object.keys(juego).length === 0) {
    return <p className="text-center text-gray-600">No se encontraron detalles del juego.</p>
  }

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-4">{juego.name}</h2>
      <img
        src={juego.background_image || "https://via.placeholder.com/600x400"}
        alt={juego.name}
        className="w-full max-h-96 object-cover rounded-lg mb-6 shadow-md"
      />

      <div className="mb-4">
        <div className="flex flex-col space-y-3">
          <p className="text-lg"><strong>Fecha de lanzamiento:</strong> {juego.released || "No disponible"}</p>
          <p className="text-lg"><strong>Calificación:</strong> {juego.rating ? juego.rating : "No disponible"}</p>
          
          <div>
            <p className="text-lg"><strong>Plataformas:</strong></p>
            <div className="flex flex-wrap gap-3 mt-2">
              {juego.platforms?.length > 0 ? (
                juego.platforms.map((p, index) => (
                  <span
                    key={index}
                    onClick={() => handlePlataformas(p.platform.id, p.platform.name)}
                    className="px-4 py-2 bg-blue-100 rounded-full text-blue-600 hover:bg-blue-200 cursor-pointer"
                  >
                    {p.platform.name}
                  </span>
                ))
              ) : "No disponible"}
            </div>
          </div>

          <div>
            <p className="text-lg"><strong>Géneros:</strong></p>
            <div className="flex flex-wrap gap-3 mt-2">
              {juego.genres?.length > 0 ? (
                juego.genres.map((g, index) => (
                  <span
                    key={index}
                    onClick={() => handleGeneros(g.name)}
                    className="px-4 py-2 bg-green-100 rounded-full text-green-600 hover:bg-green-200 cursor-pointer"
                  >
                    {g.name}
                  </span>
                ))
              ) : "No disponible"}
            </div>
          </div>

          <div>
            <p className="text-lg"><strong>Desarrollador:</strong></p>
            <div className="flex flex-wrap gap-3 mt-2">
              {juego.publishers?.length > 0 ? (
                juego.publishers.map((dev, index) => (
                  <span
                    key={index}
                    onClick={() => handlePublisher(dev.id)}
                    className="px-4 py-2 bg-yellow-100 rounded-full text-yellow-600 hover:bg-yellow-200 cursor-pointer"
                  >
                    {dev.name}
                  </span>
                ))
              ) : "No disponible"}
            </div>
          </div>

          <div>
            <p className="text-lg"><strong>Tags:</strong></p>
            <div className="flex flex-wrap gap-3 mt-2">
              {juego.tags?.length > 0 ? (
                juego.tags.map((tag, index) => (
                  <span
                    key={index}
                    onClick={() => handleTags(tag.id)}
                    className="px-4 py-2 bg-purple-100 rounded-full text-purple-600 hover:bg-purple-200 cursor-pointer"
                  >
                    {tag.name}
                  </span>
                ))
              ) : "No disponible"}
            </div>
          </div>

          <p className="text-lg"><strong>Editor:</strong> {juego.publishers?.map((pub) => pub.name).join(", ") || "No disponible"}</p>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold">Descripción:</p>
        <p className="text-sm text-gray-700">{juego.description_raw || "Sin descripción disponible."}</p>
      </div>

      <button
        onClick={toggleFavorito}
        className={`px-6 py-3 rounded-md ${favorito ? "bg-red-500 text-white" : "bg-gray-300 text-gray-700"} hover:bg-opacity-90`}
      >
        {favorito ? "Quitar de favoritos" : "Marcar como favorito"}
      </button>
    </div>
  )
}

export default DetalleJuego

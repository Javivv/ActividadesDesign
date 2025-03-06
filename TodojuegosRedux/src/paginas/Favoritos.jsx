"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { fetchGameDetails } from "../slices/gamesSlice" // Asegúrate de importar tu acción de Redux

const Favoritos = () => {
  const [juegos, setJuegos] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const favoritosGuardados = Object.keys(localStorage).filter((key) => localStorage.getItem(key) === "true")

    const cargarJuegos = async () => {
      const juegosDetalles = await Promise.all(
        favoritosGuardados.map(async (id) => {
          try {
            const action = await dispatch(fetchGameDetails(id)).unwrap()
            return action 
          } catch (error) {
            console.error(`Error al obtener el juego ${id}:`, error)
            return null
          }
        })
      )

      setJuegos(juegosDetalles.filter((juego) => juego !== null)) 
    }

    if (favoritosGuardados.length > 0) {
      cargarJuegos()
    }
  }, [dispatch])

  const handleClick = (id) => {
    navigate(`/juego/${id}`)
  }

  return (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-4xl font-bold mb-4">Juegos Favoritos</h2>
      {juegos.length === 0 ? (
        <p className="text-gray-600">No tienes juegos favoritos aún.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {juegos.map((juego) => (
            <li key={juego.id} className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer" onClick={() => handleClick(juego.id)}>
              <h3 className="text-xl font-bold mb-2">{juego.name}</h3>
              <img
                src={juego.background_image || "https://via.placeholder.com/300x200"}
                alt={juego.name}
                className="w-full h-40 object-cover rounded-lg"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Favoritos

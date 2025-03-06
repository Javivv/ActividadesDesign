import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setQuery, performSearch } from "../slices/searchSlice"

const SearchBar = () => {
  const dispatch = useDispatch()
  const { query, status } = useSelector((state) => state.search)
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!query.trim()) return // Evita enviar una búsqueda vacía

    try {
      await dispatch(performSearch(query)).unwrap()
      navigate(`/search/${query}`)
    } catch (error) {
      console.error("Error al buscar juegos:", error)
    }
  }

  const handleInputChange = (e) => {
    dispatch(setQuery(e.target.value))
  }

  return (
    <form onSubmit={handleSearch} className="flex items-center border rounded-full overflow-hidden">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar..."
        className="px-4 py-2 w-full outline-none"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2" disabled={status === "loading"}>
        {status === "loading" ? "Buscando..." : "Buscar"}
      </button>
    </form>
  )
}

export default SearchBar


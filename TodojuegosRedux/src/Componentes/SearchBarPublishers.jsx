import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setQuery } from "../slices/searchSlice";
import { searchPublishers } from "../slices/publishersSlice";

const SearchBarPublishers = () => {
  const dispatch = useDispatch();
  const { query, status } = useSelector((state) => state.search); 
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return; 

    try {
      await dispatch(searchPublishers(query)).unwrap(); 
      navigate(`/publisher/search/${query}`);
    } catch (error) {
      console.error("Error al buscar publishers:", error);
    }
  };

  const handleInputChange = (e) => {
    dispatch(setQuery(e.target.value));
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center border rounded-full overflow-hidden">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Buscar publisher..."
        className="px-4 py-2 w-full outline-none"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2" disabled={status === "loading"}>
        {status === "loading" ? "Buscando..." : "Buscar"}
      </button>
    </form>
  );
};

export default SearchBarPublishers;

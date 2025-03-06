import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const API_KEY = "5575cf21dff14fb798e8820db63e283b"
const BASE_URL = "https://api.rawg.io/api"

export const searchByGenre = createAsyncThunk("genres/searchGames", async (genreName) => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&genres=${genreName}`)
  if (!response.ok) throw new Error("Error al buscar juegos por género")
  const data = await response.json()
console.log(data);
  return data.results
})

const genresSlice = createSlice({
  name: "genres",
  initialState: {
    games: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchByGenre.pending, (state) => {
        state.status = "loading"
      })
      .addCase(searchByGenre.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.games = action.payload
      })
      .addCase(searchByGenre.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default genresSlice.reducer

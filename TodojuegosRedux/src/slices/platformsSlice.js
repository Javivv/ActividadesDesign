import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const API_KEY = "5575cf21dff14fb798e8820db63e283b"
const BASE_URL = "https://api.rawg.io/api"

export const searchByPlatform = createAsyncThunk("platforms/searchGames", async (platformName) => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&platforms=${platformName}`)
  if (!response.ok) throw new Error("Error al buscar la plataforma")
  const data = await response.json()
console.log(data);
  return data.results
})

const platformsSlice = createSlice({
  name: "platforms",
  initialState: {
    games: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchByPlatform.pending, (state) => {
        state.status = "loading"
      })
      .addCase(searchByPlatform.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.games = action.payload
      })
      .addCase(searchByPlatform.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      
  },
})

export default platformsSlice.reducer


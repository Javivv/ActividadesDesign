import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { obtenerJuegosPopulares } from "../Servicios/apiJuegos"

export const fetchCarrouselImages = createAsyncThunk("carrousel/fetchImages", async () => {
  const juegos = await obtenerJuegosPopulares()
  return juegos.slice(0, 3).map((game) => game.background_image)
})

const carrouselSlice = createSlice({
  name: "carrousel",
  initialState: {
    imagenes: Array(3).fill("https://via.placeholder.com/800x400?text=Loading..."),
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCarrouselImages.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchCarrouselImages.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.imagenes = action.payload
      })
      .addCase(fetchCarrouselImages.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export default carrouselSlice.reducer


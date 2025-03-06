import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "5575cf21dff14fb798e8820db63e283b";
const BASE_URL = "https://api.rawg.io/api";

// Acción para buscar juegos por tag
export const searchByTag = createAsyncThunk("tags/searchGames", async (tagName) => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&tags=${tagName}`);
  if (!response.ok) throw new Error("Error al buscar juegos por tag");
  const data = await response.json();
  return data.results;
});

// Acción para obtener detalles de un tag
export const fetchTagDetails = createAsyncThunk("tags/fetchTagDetails", async (tagId) => {
  const response = await fetch(`${BASE_URL}/tags/${tagId}?key=${API_KEY}`);
  if (!response.ok) throw new Error("Error al obtener los detalles del tag");
  const data = await response.json();
  return data;
});

// Reducer para manejar los estados de las acciones
const tagsSlice = createSlice({
  name: "tags",
  initialState: {
    games: [],
    tagDetails: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchByTag.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchByTag.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.games = action.payload;
      })
      .addCase(searchByTag.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTagDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTagDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tagDetails = action.payload;
      })
      .addCase(fetchTagDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default tagsSlice.reducer;

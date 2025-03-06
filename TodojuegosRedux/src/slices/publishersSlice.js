import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "5575cf21dff14fb798e8820db63e283b";
const BASE_URL = "https://api.rawg.io/api";

// Acción para buscar publishers
export const searchPublishers = createAsyncThunk(
  "publishers/searchPublishers",
  async (query) => {
    const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}&search=${query}`);
    if (!response.ok) throw new Error("Error al buscar publishers");
    const data = await response.json();
    return data.results;
  }
);

export const fetchPublishers = createAsyncThunk("publishers/fetchAll", async () => {
  const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}`);
  if (!response.ok) throw new Error("Error al obtener los desarrolladores");
  const data = await response.json();
  return data.results;
});

export const fetchPublisherDetails = createAsyncThunk("publishers/fetchDetails", async (publisherId) => {
  const response = await fetch(`${BASE_URL}/publishers/${publisherId}?key=${API_KEY}`);
  if (!response.ok) throw new Error("Error al buscar el desarrollador");
  return await response.json();
});

export const fetchPublisherGames = createAsyncThunk("publishers/fetchGames", async (publisherId) => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&developers=${publisherId}`)
  if (!response.ok) throw new Error("Error al buscar juegos del desarrollador")
  const data = await response.json()
  return data.results
})


const publishersSlice = createSlice({
  name: "publishers",
  initialState: {
    list: [],
    details: null,
    games: [],
    searchResults: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPublishers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPublishers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchPublishers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(searchPublishers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(searchPublishers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
      })
      .addCase(searchPublishers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPublisherDetails.fulfilled, (state, action) => {
        state.details = action.payload;
      })
      .addCase(fetchPublisherGames.fulfilled, (state, action) => {
        state.games = action.payload;
      });
  },
});

export default publishersSlice.reducer;

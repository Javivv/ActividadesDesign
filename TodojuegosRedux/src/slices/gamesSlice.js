import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "5575cf21dff14fb798e8820db63e283b";
const BASE_URL = "https://api.rawg.io/api";
const PAGE_SIZE = 9;

// 🔹 Obtener juegos populares (sin paginación)
export const fetchPopularGames = createAsyncThunk("games/fetchPopular", async () => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}`);
  if (!response.ok) throw new Error("Error al obtener los juegos");
  const data = await response.json();
  return data.results; // Aquí devolvemos solo los juegos
});

// 🔹 Obtener juegos populares con paginación
export const fetchPopularGamesPagination = createAsyncThunk(
  "games/fetchPopularPagination",
  async (page = 1) => {
    const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=${PAGE_SIZE}`);
    if (!response.ok) throw new Error("Error al obtener los juegos paginados");
    const data = await response.json();
    return { results: data.results, nextPage: data.next, previousPage: data.previous, currentPage: page };
  }
);

// 🔹 Buscar juegos por nombre y ordenamiento
export const searchGames = createAsyncThunk("games/search", async ({ query, ordering }) => {
  const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&search=${query}&ordering=${ordering}`);
  if (!response.ok) throw new Error("Error al buscar juegos");
  const data = await response.json();
  return data.results;
});

// 🔹 Obtener detalles de un juego específico
export const fetchGameDetails = createAsyncThunk("games/fetchDetails", async (gameId) => {
  const response = await fetch(`${BASE_URL}/games/${gameId}?key=${API_KEY}`);
  if (!response.ok) throw new Error("Error al obtener los detalles del juego");
  return await response.json();
});

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    popularGames: [],
    gameDetails: null,
    searchResults: [],
    status: "idle",
    error: null,
    currentPage: 1,
    nextPage: null,
    previousPage: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetGameDetails: (state) => {
      state.gameDetails = null; 
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchPopularGames.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularGames.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularGames = action.payload; // Directamente asignamos los juegos
      })
      .addCase(fetchPopularGames.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchPopularGamesPagination.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPopularGamesPagination.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.popularGames = action.payload.results;
        state.nextPage = action.payload.nextPage;
        state.previousPage = action.payload.previousPage;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchPopularGamesPagination.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(fetchGameDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGameDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gameDetails = action.payload;
      })
      .addCase(fetchGameDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setPage, resetGameDetails } = gamesSlice.actions;
export default gamesSlice.reducer;

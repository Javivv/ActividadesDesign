import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { buscarJuegos } from "../Servicios/apiJuegos"

export const performSearch = createAsyncThunk("search/performSearch", async (query) => {
  const juegos = await buscarJuegos(query)
  return { query, results: juegos }
})

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    clearSearch: (state) => {
      state.query = ""
      state.results = []
      state.status = "idle"
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performSearch.pending, (state) => {
        state.status = "loading"
      })
      .addCase(performSearch.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.query = action.payload.query
        state.results = action.payload.results
      })
      .addCase(performSearch.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
  },
})

export const { setQuery, clearSearch } = searchSlice.actions

export default searchSlice.reducer


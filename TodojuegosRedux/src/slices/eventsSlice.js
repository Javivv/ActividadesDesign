import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchEvents } from "../Servicios/events";

// Acción asincrónica para cargar eventos simulados
export const loadEvents = createAsyncThunk("events/loadEvents", async () => {
  const response = await fetchEvents();
  return response;
});

const initialState = {
  events: [],
  subscribedEvents: JSON.parse(localStorage.getItem("subscribedEvents")) || [], // Carga desde localStorage
  status: "idle",
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    toggleSubscription: (state, action) => {
      const eventId = action.payload;
      if (state.subscribedEvents.includes(eventId)) {
        // Si ya está inscrito, lo eliminamos
        state.subscribedEvents = state.subscribedEvents.filter((id) => id !== eventId);
      } else {
        // Si no está inscrito, lo añadimos
        state.subscribedEvents.push(eventId);
      }
      localStorage.setItem("subscribedEvents", JSON.stringify(state.subscribedEvents));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(loadEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { toggleSubscription } = eventsSlice.actions;
export default eventsSlice.reducer;

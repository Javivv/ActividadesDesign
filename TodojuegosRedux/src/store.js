import { configureStore } from "@reduxjs/toolkit";
import carrouselReducer from "./slices/carrouselSlice";
import searchReducer from "./slices/searchSlice";
import gamesReducer from "./slices/gamesSlice";
import genresReducer from "./slices/genresSlice"; // Importa genresSlice
import platformsReducer from "./slices/platformsSlice"; // Importa platformsSlice
import publishersReducer from "./slices/publishersSlice"; // Importa publishersSlice
import eventsReducer from "./slices/eventsSlice";
import tagsReducer from "./slices/tagsSlice";
import sortReducer from "./slices/sortSlice"; // Importa el nuevo slice


export const store = configureStore({
  reducer: {
    carrousel: carrouselReducer,
    search: searchReducer,
    games: gamesReducer, // Agrega gamesSlice
    genres: genresReducer, // Agrega genresSlice
    platforms: platformsReducer, // Agrega platformsSlice
    publishers: publishersReducer, // Agrega publishersSlice
    events: eventsReducer,
    tags: tagsReducer,
    sort: sortReducer,

  },
});

export default store;

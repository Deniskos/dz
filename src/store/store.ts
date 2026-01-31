import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favorive.slice";
import { safeFavoriteState } from "./storage";
import { ProfileType, ShortMovie } from "../interfaces";
import useProfile from "../hooks/useProfile";

export const store = configureStore({
	reducer: {
		favorite: favoriteReducer,
	},
});

store.subscribe(() => {
	safeFavoriteState<ShortMovie[]>(store.getState().favorite.movies);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

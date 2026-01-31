import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShortMovie } from "../interfaces";
import { loadUserFavorites } from "./storage";

export const STORAGE_PROFILES_STATE = "Профили";

interface FavoriteState {
	movies: ShortMovie[];
}

const initialState: FavoriteState = {
	movies: loadUserFavorites<ShortMovie[]>(STORAGE_PROFILES_STATE) || [],
};

const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		addMovie: (store, action: PayloadAction<ShortMovie>) => {
			store.movies.push({
				...action.payload,
				isFavorite: true,
			});
		},
		deleteMovie: (store, action: PayloadAction<ShortMovie>) => {
			store.movies = store.movies.filter((movie) => {
				const { payload } = action;
				return movie.imdbID !== payload.imdbID;
			});
		},
		setFavoriteFromStorage: (
			store,
			action: PayloadAction<ShortMovie[]>,
		) => {
			store.movies = action.payload;
		},
		clearFavorite: (store) => {
			store.movies = [];
		},
	},
});

export const { addMovie, deleteMovie, clearFavorite, setFavoriteFromStorage } =
	favoriteSlice.actions;

export default favoriteSlice.reducer;

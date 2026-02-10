import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ShortMovie, ProfileType } from "../interfaces";
import { loadUserProfile } from "./storage";
import { STORAGE_PROFILES_STATE } from "../constants";

interface FavoriteState {
	movies: ShortMovie[];
}

const initialState: FavoriteState = {
	movies:
		loadUserProfile<ProfileType>(STORAGE_PROFILES_STATE)
			?.favorites || [],
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

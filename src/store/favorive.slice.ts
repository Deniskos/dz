import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../interfaces";

interface FavoriteState {
	count: number;
	movies: Movie[];
}

const initialState: FavoriteState = {
	count: 0,
	movies: [],
};

const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		addMovie: (store, action: PayloadAction<Movie>) => {
			store.movies.push({
				...action.payload,
				isFavorite: true,
			});
			store.count += 1;
		},
		deleteMovie: (store, action: PayloadAction<Movie>) => {
			store.movies = store.movies.filter((movie) => {
				const { payload } = action;
				return movie.imdbID !== payload.imdbID;
			});
			store.count -= 1;
		},
	},
});

export const { addMovie, deleteMovie } = favoriteSlice.actions;

export default favoriteSlice.reducer;

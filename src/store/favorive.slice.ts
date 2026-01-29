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
		addMovies: (store, action: PayloadAction<Movie>) => {
			store.movies.push({
				...action.payload,
				isFavorite: true,
			});
			store.count += 1;
		},
	},
});

export const { addMovies } = favoriteSlice.actions;

export default favoriteSlice.reducer;

import { ShortMovie, FullMovieData } from "../interfaces";

export const takeMovieShortData = (data: FullMovieData): ShortMovie => {
	const { Poster, Title, Type, Released, imdbID, isFavorite } = data;
	return {
		poster: Poster,
		title: Title,
		type: Type,
		year: Released,
		imdbID: imdbID,
		isFavorite: !!isFavorite,
	};
};

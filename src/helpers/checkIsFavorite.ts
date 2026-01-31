import { ShortMovie } from "../interfaces";

export const checkIsFavorite = (
	imdbID: string,
	userFavorites: ShortMovie[],
) => {
	return userFavorites.some(
		(favoriteItem) => favoriteItem.imdbID === imdbID,
	);
};

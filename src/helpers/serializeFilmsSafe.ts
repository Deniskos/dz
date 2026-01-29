import { ServerResponse } from "../components/Search/interface";
import { Movie } from "../interfaces";

export function serializeFilmsSafe(
	data: ServerResponse,
	userFavorites: Movie[],
): Movie[] {
	if (!data || data.Response !== "True" || !Array.isArray(data.Search)) {
		return [];
	}

	const checkFavorites = (serverItem) => {
		return userFavorites.find(
			(favoriteItem) =>
				favoriteItem.imdbID === serverItem.imdbID,
		);
	};

	return data.Search.filter((item) => item && item.Title && item.imdbID) // Фильтруем некорректные данные
		.map((item) => ({
			poster:
				item.Poster !== "N/A"
					? item.Poster
					: "https://m.media-amazon.com/images/M/MV5BMTU2NTYxODcwMF5BMl5BanBnXkFtZTcwNDk1NDY0Nw@@._V1_SX300.jpg",
			title: item.Title,
			type: item.Type || "movie",
			year: item.Year || "",
			imdbID: item.imdbID,
			isFavorite: checkFavorites(item),
		}));
}

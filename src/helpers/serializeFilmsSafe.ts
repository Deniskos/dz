import { ServerResponse } from "../components/Search/interface";
import { ShortMovie } from "../interfaces";
import { checkIsFavorite } from "./checkIsFavorite";

const posterPlug =
	"https://m.media-amazon.com/images/M/MV5BMTU2NTYxODcwMF5BMl5BanBnXkFtZTcwNDk1NDY0Nw@@._V1_SX300.jpg";

export function serializeFilmsSafe(
	data: ServerResponse,
	userFavorites: ShortMovie[],
): ShortMovie[] {
	if (!data || data.Response !== "True" || !Array.isArray(data.Search)) {
		return [];
	}

	return data.Search.filter((item) => item && item.Title && item.imdbID) // Фильтруем некорректные данные
		.map((item) => ({
			poster:
				item.Poster !== "N/A"
					? item.Poster
					: posterPlug,
			title: item.Title,
			type: item.Type || "movie",
			year: item.Year || "",
			imdbID: item.imdbID,
			isFavorite: checkIsFavorite(item.imdbID, userFavorites),
		}));
}

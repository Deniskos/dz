export interface MovieData {
	Type: string;
	Released: string;
	BoxOffice: string;
	Runtime: string;
	Genre: string;
	Actors: string;
	Title: string;
	Poster: string;
	Plot: string;
	imdbRating: string;
	Awards: string;
	[key: string]: any; // для других возможных полей
}

export interface MovieInfoItem {
	title: string;
	desc: string;
}

export interface ProfileType {
	name: string;
	isLogined: boolean;
}

export interface Movie {
	poster: string;
	title: string;
	type: string;
	year: string;
	imdbID: string;
	isFavorite: boolean;
}

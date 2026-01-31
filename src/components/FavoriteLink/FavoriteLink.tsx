import cn from "classnames";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ShortMovie } from "../../interfaces";
import { addMovie, deleteMovie } from "../../store/favorite.slice";
import { AppDispatch } from "../../store/store";
import styles from "./styles.module.css";

interface FavoriteLinkProps {
	shortMovieData: ShortMovie;
}

const FavoriteLink = ({ shortMovieData }: FavoriteLinkProps) => {
	const [isFavorite, setIsFavorite] = useState(
		shortMovieData.isFavorite || false,
	);
	const dispatch = useDispatch<AppDispatch>();
	const handlerFavorite = (
		event: React.MouseEvent<HTMLAnchorElement>,
	) => {
		event.preventDefault();

		if (isFavorite) {
			dispatch(deleteMovie(shortMovieData));
			setIsFavorite(false);
			return;
		}
		dispatch(addMovie(shortMovieData));
		setIsFavorite(true);
	};
	return (
		<a
			href=""
			className={cn(styles.favoriteLink, {
				[styles["favorit-added"]]: isFavorite,
			})}
			onClick={handlerFavorite}
		>
			{isFavorite ? "В избранном" : "В избранное"}
		</a>
	);
};

export default FavoriteLink;

import cn from "classnames";
import { useDispatch } from "react-redux";
import { Movie } from "../../interfaces";
import { addMovie, deleteMovie } from "../../store/favorive.slice";
import { AppDispatch } from "../../store/store";
import styles from "./styles.module.css";

interface FavoriteLinkProps {
	filmData: Movie;
}

const FavoriteLink = ({ filmData }: FavoriteLinkProps) => {
	const { isFavorite } = filmData;
	const dispatch = useDispatch<AppDispatch>();
	const handlerFavorite = (
		event: React.MouseEvent<HTMLAnchorElement>,
	) => {
		event.preventDefault();

		if (isFavorite) {
			dispatch(deleteMovie(filmData));
			return;
		}
		dispatch(addMovie(filmData));
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

import { Link } from "react-router-dom";
import { Movie } from "../../interfaces";
import FavoriteLink from "../FavoriteLink/FavoriteLink";
import styles from "./styles.module.css";

interface FilmItemProps {
	film: Movie;
}

const FilmItem = ({ film }: FilmItemProps) => {
	if (!film) {
		return null;
	}

	return (
		<li className={styles["film-item"]}>
			<Link to={`/movie/${film.imdbID}`}>
				{/* <Rating
					position="absolute"
					rating={film.likes}
				/> */}
				<div className={styles["image-wrapper"]}>
					<img src={`${film.poster}`} alt="" />
				</div>
				<h3 className={styles["film-name"]}>
					{film.title}
				</h3>
			</Link>
			<FavoriteLink filmData={film} />
		</li>
	);
};

export default FilmItem;

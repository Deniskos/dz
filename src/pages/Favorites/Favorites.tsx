import Title from "../../components/Title/Title";
import styles from "./styles.module.css";

import { useSelector } from "react-redux";
import FilmList from "../../components/FilmList/FilmList";
import { RootState } from "../../store/store";

export const Favorites = () => {
	const favoritefilms = useSelector(
		(store: RootState) => store.favorite.movies,
	);

	return (
		<div className={styles["favorites-root"]}>
			<Title>Избранное</Title>
			<FilmList films={favoritefilms} />
		</div>
	);
};

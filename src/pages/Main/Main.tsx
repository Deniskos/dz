import { useState } from "react";
import FilmList from "../../components/FilmList/FilmList";
import Paragraph from "../../components/Paragraph/Paragraph";
import Search from "../../components/Search/Search";
import Title from "../../components/Title/Title";

import { ShortMovie } from "../../interfaces";
import styles from "./styles.module.css";

export const Main = () => {
	const [filmsList, setFilmList] = useState<ShortMovie[]>([]);
	return (
		<div className={styles["main-page"]}>
			<div className={styles["search-head"]}>
				<Title>Поиск</Title>
				<Paragraph size="regular">
					Введите название фильма, сериала или
					мультфильма для поиска и добавления в
					избранное.
				</Paragraph>
			</div>
			<Search setFilmList={setFilmList} />
			<FilmList films={filmsList} />
		</div>
	);
};

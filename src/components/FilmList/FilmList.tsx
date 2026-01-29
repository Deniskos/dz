import React from "react";

import FilmItem from "../FilmItem/FilmItem";

import { Movie } from "../../interfaces";
import styles from "./styles.module.css";

interface FilmListProps {
	films: Movie[] | [];
}

const FilmList = ({ films }: FilmListProps) => {
	if (films.length < 1) {
		return null;
	}

	return (
		<div className={styles.films}>
			<ul className={styles["films__list"]}>
				{films.map((film) => (
					<React.Fragment
						key={`${film.title} ${film.poster}`}
					>
						<FilmItem film={film} />
					</React.Fragment>
				))}
			</ul>
		</div>
	);
};

export default FilmList;

import cn from "classnames";
import { useLoaderData } from "react-router-dom";
import FavoriteLink from "../../components/FavoriteLink/FavoriteLink";
import Rating from "../../components/Rating/Rating";
import Title from "../../components/Title/Title";
import { FullMovieData, MovieInfoItem } from "../../interfaces";

import { useSelector } from "react-redux";
import { checkIsFavorite } from "../../helpers/checkIsFavorite";
import { takeMovieShortData } from "../../helpers/takeMovieShortData";
import { RootState } from "../../store/store";
import styles from "./styles.module.css";

export const Movie = () => {
	const movieData = useLoaderData() as FullMovieData | null;

	if (!movieData) {
		return <div className={styles["loading"]}>Загрузка...</div>;
	}

	const favoritefilms = useSelector(
		(store: RootState) => store.favorite.movies,
	);

	const isFavorite = checkIsFavorite(movieData.imdbID, favoritefilms);
	const movie = { ...movieData, isFavorite: isFavorite };
	const shortMovieData = takeMovieShortData(movie);

	const movieInfo: MovieInfoItem[] = [
		{
			title: "Тип",
			desc: movie.Type || "Не указано",
		},
		{
			title: "Дата выхода",
			desc: movie.Released || "Не указана",
		},
		{
			title: "Бюджет",
			desc: movie.BoxOffice || "Не указан",
		},
		{
			title: "Длительность",
			desc: movie.Runtime || "Не указана",
		},
		{
			title: "Жанр",
			desc: movie.Genre || "Не указан",
		},
		{
			title: "Актеры",
			desc: movie.Actors || "Не указаны",
		},
	];

	return (
		<div className={styles["movie-root"]}>
			<header className={styles["text-wrapper"]}>
				<p className={styles["upper-title"]}>
					Поиск фильмов
				</p>
				<Title size="h2">{movie.Title}</Title>
			</header>
			<main className={styles["main"]}>
				<div
					className={cn(
						styles["col"],
						styles["poster"],
					)}
				>
					<img
						src={movie.Poster}
						alt={`Постер фильма ${movie.Title}`}
					/>
				</div>
				<div
					className={cn(
						styles["col"],
						styles["description"],
					)}
				>
					<div
						className={
							styles[
								"text-description"
							]
						}
					>
						{movie.Plot ||
							"Описание отсутствует"}
					</div>
					<div
						className={cn(
							styles["movie-actions"],
						)}
					>
						<Rating
							position="static"
							rating={
								movie.imdbRating
							}
						/>
						<FavoriteLink
							shortMovieData={
								shortMovieData
							}
						/>
					</div>

					<ul className={styles["movie-info"]}>
						{movieInfo.map(
							(infoItem, index) => (
								<li
									key={`${infoItem.title}-${index}`}
									className={
										styles[
											"info-item"
										]
									}
								>
									<span
										className={
											styles[
												"info-title"
											]
										}
									>
										{
											infoItem.title
										}
									</span>
									<span
										className={
											styles[
												"info-description"
											]
										}
									>
										{
											infoItem.desc
										}
									</span>
								</li>
							),
						)}
					</ul>
				</div>
			</main>

			{movie.Awards && (
				<section className={styles["awards"]}>
					{" "}
					<div className={styles["text-wrapper"]}>
						<Title size="h3">Награды</Title>
						<div
							className={
								styles[
									"text-description"
								]
							}
						>
							{movie.Awards}
						</div>
					</div>
				</section>
			)}
		</div>
	);
};

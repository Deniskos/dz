import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { serializeFilmsSafe } from "../../helpers/serializeFilmsSafe";
import Button from "../Button/Button";
import Input from "../Input/Input";

import { useState } from "react";
import NotFound from "../NotFound/NotFound";

import { API_KEY, API_URL } from "../../constants";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ShortMovie } from "../../interfaces";
import { RootState } from "../../store/store";
import styles from "./styles.module.css";

interface SearchProps {
	setFilmList: (films: ShortMovie[] | []) => void;
}

const MOVIE_NOT_FOUND = "Movie not found!";

const Search = ({ setFilmList }: SearchProps) => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { isLogined } = useContext(UserContext);

	const userFavorites = useSelector(
		(store: RootState) => store.favorite.movies,
	);

	const isNotFound = error === MOVIE_NOT_FOUND;
	const navigate = useNavigate();

	async function getFilms() {
		if (!isLogined) {
			navigate("/login");
		}
		if (!searchValue.trim()) {
			// Валидация ввода
			setError("Введите название фильма");
			return;
		}

		if (searchValue.trim().length < 3) {
			setError("Введите минимум 3 символа");
			return;
		}

		setIsLoading(true);
		setError("");
		try {
			const response = await axios.get(
				`${API_URL}/?apikey=${API_KEY}&s=${searchValue}&plot=full`,
			);
			if (response.data?.Response === "True") {
				setFilmList(
					serializeFilmsSafe(
						response.data,
						userFavorites,
					),
				);
			} else {
				setFilmList([]);
				setError(response.data.Error);
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				console.error("Ошибка API:", error.message);
				setError(
					"Ошибка сети. Проверьте подключение к интернету.",
				);
			} else {
				setError("Произошла неизвестная ошибка");
			}
			setFilmList([]);
		} finally {
			setIsLoading(false);
		}
	}

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		// Если это обычный печатный символ (длина = 1)
		if (e.key.length === 1) {
			// Проверяем, соответствует ли он нашим правилам
			// Теперь разрешаем: латинские буквы, пробел и цифры 0-9
			const allowedRegex = /^[a-zA-Z0-9\s]$/;
			if (!allowedRegex.test(e.key)) {
				e.preventDefault();
			}
		}
		// Все остальные клавиши (Backspace, Delete, стрелки и т.д.) разрешены
	};

	return (
		<div className={styles["search-root"]}>
			<Input
				value={searchValue}
				onChange={(
					e: React.ChangeEvent<HTMLInputElement>,
				) => setSearchValue(e.target.value)}
				type="search"
				name="search"
				className={styles["search"]}
				placeholder="Введите название латинскими буквами"
				iconName="search-normal.svg"
				disabled={isLoading}
				onKeyDown={handleKeyDown}
			/>
			<Button
				onClick={getFilms}
				disabled={isLoading || !searchValue.trim()}
			>
				{isLoading ? "Поиск..." : "Искать"}
			</Button>
			{error && error !== MOVIE_NOT_FOUND && (
				<div className={styles.error}>{error}</div>
			)}
			{isNotFound && <NotFound />}
		</div>
	);
};

export default Search;

import cn from "classnames";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import useProfile from "../../hooks/useProfile";
import { clearFavorite } from "../../store/favorite.slice";
import { RootState } from "../../store/store";
import { clearProfile } from "../../store/userProfile.slice";
import styles from "./styles.module.css";

const Menu = () => {
	const dispatch = useDispatch();
	const favoriteCount = useSelector(
		(store: RootState) => store.favorite.movies.length,
	);
	const favorites = useSelector(
		(state: RootState) => state.favorite.movies,
	);
	const { loginRef } = useContext(AppContext);
	const [loginProfile, exitStorageProfile] = useProfile();
	const { name: userName, isLogined } = useSelector(
		(store: RootState) => store.userProfile,
	);

	const exitProfile = () => {
		exitStorageProfile(userName, favorites);
		dispatch(clearProfile());
		dispatch(clearFavorite());
	};

	const clickHandler = (event: React.MouseEvent) => {
		if (isLogined) {
			exitProfile();
		} else {
			loginRef.current?.focus();
		}
	};
	return (
		<menu role="navigation" className={styles.navigation}>
			<nav className={styles.nav}>
				<ul className={styles["nav-list"]}>
					<li className={styles["nav-item"]}>
						<NavLink
							to="/"
							className={({
								isActive,
							}) =>
								cn(
									styles[
										"nav-link"
									],
									{
										[styles.active]:
											isActive,
									},
								)
							}
						>
							Поиск фильмов
						</NavLink>
					</li>
					{isLogined && (
						<>
							<li
								className={
									styles[
										"nav-item"
									]
								}
							>
								<NavLink
									to="/favorites"
									className={({
										isActive,
									}) =>
										cn(
											styles[
												"nav-link"
											],
											{
												[styles.active]:
													isActive,
											},
										)
									}
								>
									Мои
									фильмы
									{favoriteCount !==
										0 && (
										<span
											className={cn(
												styles[
													"favoriteCount"
												],
											)}
										>
											{
												favoriteCount
											}
										</span>
									)}
								</NavLink>
							</li>
							<li
								className={cn(
									styles[
										"nav-item"
									],
									styles[
										"nav-item__name"
									],
								)}
							>
								<NavLink
									className={({
										isActive,
									}) =>
										cn(
											styles[
												"nav-link"
											],
											{
												[styles.active]:
													isActive,
											},
										)
									}
									to={`/profile/${userName}`}
								>
									{
										userName
									}
								</NavLink>
							</li>
						</>
					)}
					<li className={styles["nav-item"]}>
						<NavLink
							to="/login"
							onClick={clickHandler}
							className={({
								isActive,
							}) =>
								cn(
									styles[
										"nav-link"
									],
									{
										[styles.active]:
											isActive,
										[styles[
											"nav-link__login"
										]]:
											!isLogined,
									},
								)
							}
						>
							{isLogined
								? "Выйти"
								: "Войти"}
						</NavLink>
					</li>
				</ul>
			</nav>
		</menu>
	);
};

export default Menu;

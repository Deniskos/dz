import cn from "classnames";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { clearFavorite } from "../../store/favorive.slice";
import { RootState } from "../../store/store";
import { MenuProps } from "./Menu.props";
import styles from "./styles.module.css";

const Menu = ({ exitHandler, loginRef }: MenuProps) => {
	const dispatch = useDispatch();
	const favoriteCount = useSelector(
		(store: RootState) => store.favorite.movies.length,
	);
	const { currentUserName, isLogined } = useContext(UserContext);
	const clickHandler = (event: React.MouseEvent) => {
		if (isLogined) {
			exitHandler();
			dispatch(clearFavorite());
		} else {
			loginRef.current?.focus();
		}
	};
	return (
		<menu className={styles.navigation}>
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
									to={`/profile/${currentUserName}`}
								>
									{
										currentUserName
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

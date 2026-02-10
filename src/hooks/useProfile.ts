import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { ShortMovie } from "../interfaces";
import { useDispatch } from "react-redux";
import { setFavoriteFromStorage } from "../store/favorite.slice";

const useProfile = (): [
	loginProfile: (name: string) => void,
	exitStorageProfile: (name: string, favorites: ShortMovie[]) => void,
] => {
	const { profiles, setProfiles } = useContext(AppContext);
	const dispatch = useDispatch();

	const exitStorageProfile = (
		name: string,
		favorites: ShortMovie[],
	): void => {
		const newProfiles = profiles.map((profile) => {
			if (profile.name === name) {
				return {
					...profile,
					isLogined: false,
					favorites,
				};
			}
			return profile;
		});
		localStorage.setItem("Профили", JSON.stringify(newProfiles));
		setProfiles(newProfiles);
	};

	const loginProfile = (name: string): void => {
		// Проверяем, есть ли пользователь с таким именем
		const profileIndex = profiles.findIndex(
			(profile) => profile.name === name,
		);
		// Пользователя нет - добавляем нового
		if (profileIndex === -1) {
			const newProfile = {
				name,
				isLogined: true,
				favorites: [],
			};
			try {
				localStorage.setItem(
					"Профили",
					JSON.stringify([
						...profiles,
						newProfile,
					]),
				);
				setProfiles([...profiles, newProfile]);
			} catch (e) {
				console.error(e);
			}
		} else {
			const newProfiles = profiles.map((profile, index) => {
				if (index === profileIndex) {
					dispatch(
						setFavoriteFromStorage(
							profile.favorites,
						),
					);
					return { ...profile, isLogined: true };
				}
				return profile;
			});
			try {
				localStorage.setItem(
					"Профили",
					JSON.stringify(newProfiles),
				);
				setProfiles(newProfiles);
			} catch (e) {
				console.error(e);
			}
		}
	};

	return [loginProfile, exitStorageProfile];
};

export default useProfile;

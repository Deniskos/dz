import { ShortMovie } from "../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { setFavoriteFromStorage } from "../store/favorite.slice";
import { RootState } from "../store/store";
import { setProfiles } from "../store/allProfiles.slice";

const useProfile = (): [
	loginProfile: (name: string) => void,
	exitStorageProfile: (name: string, favorites: ShortMovie[]) => void,
] => {
	const { profiles } = useSelector((store: RootState) => store);
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
		dispatch(setProfiles(newProfiles));
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
				dispatch(
					setProfiles([...profiles, newProfile]),
				);
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
				dispatch(setProfiles(newProfiles));
			} catch (e) {
				console.error(e);
			}
		}
	};

	return [loginProfile, exitStorageProfile];
};

export default useProfile;

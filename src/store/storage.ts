import { ProfileType } from "../interfaces";

export function loadUserFavorites<T>(key: string): T | undefined {
	try {
		const jsonState = localStorage.getItem(key);
		if (!jsonState) {
			return undefined;
		}

		const parsedState = JSON.parse(jsonState);
		const userFavorites = parsedState.find(
			(profile: ProfileType) => profile.isLogined,
		);

		return userFavorites.favorites;
	} catch (e) {
		console.error(e);
		return undefined;
	}
}

export function safeFavoriteState<T>(userFavorite: T): void {
	let profiles: ProfileType[] = [];
	try {
		const receivedProfiles = localStorage.getItem("Профили");

		if (receivedProfiles) {
			const parsed = JSON.parse(receivedProfiles);
			if (Array.isArray(parsed)) {
				// Фильтруем только валидные объекты
				const validProfiles = parsed.filter(
					(item) =>
						item &&
						typeof item === "object" &&
						typeof item.name === "string" &&
						typeof item.isLogined ===
							"boolean",
				);
				profiles = validProfiles;
			} else {
				// Если данные есть, но не массив
				console.warn(
					"Данные в localStorage не являются массивом",
				);
				profiles = [];
			}
		} else {
			profiles = [];
		}
	} catch (error) {
		console.error(
			"Ошибка при чтении профилей из localStorage:",
			error,
		);
		// Очищаем повреждённые данные
		localStorage.removeItem("Профили");
	}

	console.log("profiles!!!", profiles);

	if (profiles) {
		const updatedProfiles = profiles.map((profile) => {
			if (profile.isLogined) {
				return { ...profile, favorites: userFavorite };
			}
			return profile;
		});

		const stringProfiles = JSON.stringify(updatedProfiles);
		localStorage.setItem("Профили", stringProfiles);
	}
}

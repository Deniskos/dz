import { ReactNode, useEffect, useRef, useState } from "react";
import { ProfileType } from "../interfaces";
import { AppContext } from "./AppContext";

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
	const [isLogined, setIsLogined] = useState<boolean>(false);
	const loginRef = useRef<HTMLInputElement>();

	const [profiles, setProfiles] = useState<ProfileType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const loadProfiles = () => {
			try {
				setIsLoading(true);
				setError(null);

				const stored = localStorage.getItem("Профили");

				if (stored) {
					const parsed = JSON.parse(stored);
					// Валидация данных
					if (Array.isArray(parsed)) {
						// Фильтруем только валидные объекты
						const validProfiles =
							parsed.filter(
								(item) =>
									item &&
									typeof item ===
										"object" &&
									typeof item.name ===
										"string" &&
									typeof item.isLogined ===
										"boolean",
							);
						setProfiles(validProfiles);
					} else {
						// Если данные есть, но не массив
						console.warn(
							"Данные в localStorage не являются массивом",
						);
						setProfiles([]);
					}
				} else {
					setProfiles([]);
				}
			} catch (error) {
				console.error(
					"Ошибка при чтении профилей из localStorage:",
					error,
				);
				setError("Не удалось загрузить профили");
				// Очищаем повреждённые данные
				localStorage.removeItem("Профили");
				setProfiles([]);
			} finally {
				setIsLoading(false);
			}
		};

		loadProfiles();
	}, []);

	useEffect(() => {
		// Проверяем, что profiles является массивом
		if (Array.isArray(profiles)) {
			(profiles || []).forEach((profile) => {
				if (profile.isLogined) {
					setIsLogined(true);
					// setCurrentUserName(profile.name);
				}
			});
		}
		// Если profiles - функция, ничего не делаем
	}, [profiles]);

	return (
		<AppContext.Provider
			value={{
				profiles,
				setProfiles,
				loginRef,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

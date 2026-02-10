import { createContext, RefObject, SetStateAction } from "react";
import { ProfileType } from "../interfaces";

export interface AppContextType {
	profiles: ProfileType[] | [];
	setProfiles: React.Dispatch<SetStateAction<ProfileType[]>>;
	// currentUserName: string;
	// setCurrentUserName: Dispatch<SetStateAction<string>>;
	// isLogined: boolean;
	// setIsLogined: Dispatch<SetStateAction<boolean>>;
	loginRef: RefObject<HTMLInputElement>;
}

const defaultContextValue: AppContextType = {
	profiles: [],
	setProfiles: () => {},
	// currentUserName: "",
	// setCurrentUserName: () => {},
	// isLogined: false,
	// setIsLogined: () => {},
	loginRef: {},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

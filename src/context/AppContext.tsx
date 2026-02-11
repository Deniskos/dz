import { createContext, RefObject } from "react";

export interface AppContextType {
	loginRef: RefObject<HTMLInputElement>;
}

const defaultContextValue: AppContextType = {
	loginRef: {},
};

export const AppContext = createContext<AppContextType>(defaultContextValue);

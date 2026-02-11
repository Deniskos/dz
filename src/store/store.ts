import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./favorite.slice";
import userProfileReducer from "./userProfile.slice";
import allProfilesReducer from "./allProfiles.slice";
import { safeFavoriteState } from "./storage";
import { ProfileType, ShortMovie } from "../interfaces";
import useProfile from "../hooks/useProfile";

export const store = configureStore({
	reducer: {
		favorite: favoriteReducer,
		userProfile: userProfileReducer,
		profiles: allProfilesReducer,
	},
});

store.subscribe(() => {
	safeFavoriteState<ShortMovie[]>(store.getState().favorite.movies);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

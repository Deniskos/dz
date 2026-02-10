import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadUserProfile } from "./storage";
import { ProfileType } from "../interfaces";
import { STORAGE_PROFILES_STATE } from "../constants";

interface UserProfile {
	name: string;
	isLogined: boolean;
}

const initialState: UserProfile = {
	name: loadUserProfile<ProfileType>(STORAGE_PROFILES_STATE)?.name || "",
	isLogined:
		loadUserProfile<ProfileType>(STORAGE_PROFILES_STATE)
			?.isLogined || false,
};

const userProfileSlice = createSlice({
	name: "userProfile",
	initialState,
	reducers: {
		setUserProfile: (store, action: PayloadAction<string>) => {
			store.name = action.payload;
			store.isLogined = true;
		},
		clearProfile: (store) => {
			store.name = "";
			store.isLogined = false;
		},
	},
});

export const { setUserProfile, clearProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;

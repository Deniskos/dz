import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProfileType } from "../interfaces";
import { loadAllProfiles } from "./storage";
import { STORAGE_PROFILES_STATE } from "../constants";

const initialState: ProfileType[] =
	loadAllProfiles<ProfileType[]>(STORAGE_PROFILES_STATE) || [];

const allProfilesSlice = createSlice({
	name: "allProfiles",
	initialState,
	reducers: {
		setProfiles: (_, action: PayloadAction<ProfileType[]>) => {
			return action.payload;
		},
	},
});

export const { setProfiles } = allProfilesSlice.actions;

export default allProfilesSlice.reducer;

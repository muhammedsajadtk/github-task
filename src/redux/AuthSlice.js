import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	accessToken: localStorage.getItem("accessToken") || null,
	darkMode: !false,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAccessToken: (state, action) => {
			state.accessToken = action.payload;
			localStorage.setItem("accessToken", action.payload);
		},
		clearAccessToken: (state) => {
			state.accessToken = null;
		},
		toggleDarkMode: (state) => {
			state.darkMode = !state.darkMode;
		},
	},
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;
export const toggleDarkMode = authSlice.actions.toggleDarkMode;

export default authSlice.reducer;

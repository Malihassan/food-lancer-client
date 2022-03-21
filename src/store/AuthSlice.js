import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const authSlice = createSlice({
	name: "authenticated",
	initialState: {
		authenticated: false,
	},
	reducers: {
		login: (state) => {
			state.authenticated = true;
		},
		logout: (state) => {
			state.authenticated = false;
		},
	},
	extraReducers: {},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;

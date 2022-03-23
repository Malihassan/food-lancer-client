import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../network/axiosConfig";

// First, create the thunk
// const login = createAsyncThunk(
// 	"users/fetchByIdStatus",
// 	async (userId, thunkAPI) => {
// 		const response = await userAPI.fetchById(userId);
// 		return response.data;
// 	}
// );

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

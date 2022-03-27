import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import productSlice from './ProductSlice';
import loaderSlice from './LoadingSlice';
const store = configureStore({
	reducer: {
		auth:authSlice,
		product:productSlice,
		loader:loaderSlice
	},	
});
export default store;

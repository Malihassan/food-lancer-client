import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import orderSlice from "./orderSlice";
import productSlice from './ProductSlice';
import loaderSlice from './LoadingSlice';
const store = configureStore({
	reducer: {
		auth:authSlice,
		product:productSlice,
		loader:loaderSlice,
    order: orderSlice
	},	
});
export default store;

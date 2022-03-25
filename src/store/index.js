import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import orderSlice from "./orderSlice";
import productSlice from './ProductSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    order: orderSlice,
    product:productSlice
  },	
});
export default store;

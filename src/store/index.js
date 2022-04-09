import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import orderSlice from "./orderSlice";
import productSlice from './ProductSlice';
import loaderSlice from './LoadingSlice';
import BuyerOrderSlice from "./BuyerOrderSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    order: orderSlice,
    product:productSlice,
    removedItems: BuyerOrderSlice,
    loader:loaderSlice,
  },	
});
export default store;

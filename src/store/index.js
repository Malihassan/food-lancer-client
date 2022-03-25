import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import orderSlice from "./orderSlice";
const store = configureStore({
  reducer: {
    auth: authSlice,
    order: orderSlice,
  },
});

export default store;

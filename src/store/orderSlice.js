import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  _id: "",
  selectedOrderProducts: [],
  totalPrice: 0,
  createdAt: "",
  status: "",
};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    toggleDetailsOrder(state, { payload }) {
      state._id = payload._id;
      state.selectedOrderProducts = payload.products;
      state.totalPrice = payload.totalPrice;
      state.createdAt = payload.createdAt;
      state.status = payload.status;
    },
    setCartItem(state, {payload}){
      state.selectedOrderProducts = payload.products;
      state.totalPrice = payload.totalPrice;
    }
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;

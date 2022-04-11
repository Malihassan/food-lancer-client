import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orderId: "",
  sellerId: "",
  buyerId: "",
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
      state.orderId = payload.orderId;
      state.sellerId = payload.sellerId
      state.buyerId = payload.buyerId;
      state.selectedOrderProducts = payload.products;
      state.totalPrice = payload.totalPrice;
      state.createdAt = payload.createdAt;
      state.status = payload.status;
    },
    
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
      state.selectedOrderProducts = payload[0].products;
      state.totalPrice = payload[0].totalPrice;
      state.createdAt = payload[0].createdAt;
      state.status = payload[0].status
    },
    setCartItem(state, {payload}){
      state.selectedOrderProducts = payload.products;
      state.totalPrice = payload.totalPrice;
      console.log(state);
    }
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;

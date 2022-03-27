import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  showDetailsOrder: false,
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
      state.showDetailsOrder = !state.showDetailsOrder;
      //   state.showDetailsOrder
      //     ? state.selectedOrder.push(payload)
      //     : (state.selectedOrder = []);
      if (!state.showDetailsOrder) {
        state.initialState = initialState;
        return;
      }
      state.selectedOrderProducts = payload[0].products;
      state.totalPrice = payload[0].totalPrice;
      state.createdAt = payload[0].createdAt;
      state.status = payload[0].status
    },
  },
});

export const orderActions = orderSlice.actions;
export default orderSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  removedItems: [],
  selectedOrderProducts: {},
  sellerOrderPrice: {},
  totalPrice: 0,
  productCount: 0
};
const cartItemsSlice = createSlice({
  name: "removedItems",
  initialState,
  reducers: {
    setRemovedItems(state, { payload }) {
      state.removedItems = payload.removedItems;
      console.log(state)
    },
    setCartItem(state, { payload }) {
      state.selectedOrderProducts = payload.products;
      state.sellerOrderPrice = payload.sellerOrderPrice;
      state.totalPrice = payload.totalPrice;
      state.productCount = payload.count;
    },
  },
});

export const cartItemsActions = cartItemsSlice.actions;
export default cartItemsSlice.reducer;

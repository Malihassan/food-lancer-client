import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  removedItems: [],
};
const buyerOrderSlice = createSlice({
  name: "removedItems",
  initialState,
  reducers: {
    setRemovedItems(state, { payload }) {
      state.removedItems = payload.products;
    },
  },
});

export const buyerOrderActions = buyerOrderSlice.actions;
export default buyerOrderSlice.reducer;

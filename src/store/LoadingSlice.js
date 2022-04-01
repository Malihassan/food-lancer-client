import { createSlice } from "@reduxjs/toolkit";

const loadSlice = createSlice({
  name: "load",
  initialState: {
    loading: false,
  },
  reducers: {
    toggelLoader(state) {
      state.loading = !state.loading;
    },
  },
});

export const loadActions = loadSlice.actions;

export default loadSlice.reducer;

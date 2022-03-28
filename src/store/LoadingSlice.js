import { createSlice } from "@reduxjs/toolkit";

// export const loadings = createAsyncThunk(
//   "load/loadings",
//    async (check) => {
//      return check;
//    });  
const loadSlice = createSlice({
  name: "load",
  initialState: {
    loading: false,
  },
  reducers: {
    toggelLoader(state){
      state.loading= ! state.loading;
    }
  },
  // extraReducers: {
  //   // [loadings.pending]: (state) => {
  //     // console.log("pending");
  //   // },
  //   [loadings.fulfilled]: (state, { payload }) => {
  //     state.loading = payload;
  //   },
  //   [loadings.rejected]: (state) => {
  //     console.log("rejected");
  //   },
  // },
});

export const loadActions = loadSlice.actions;

export default loadSlice.reducer;

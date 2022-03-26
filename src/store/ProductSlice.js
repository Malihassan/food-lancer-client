import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../network/axiosConfig";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (page=1) => {
      const res = await axiosInstance.get("seller/product/myProducts",
      {
        params:{
          page:page
        }
      });
      return res.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    // resErrorMes: "",
    pageCount:1,
    totoalDocs:0,
    status: null,
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state,action) => {
      state.status = "loading";
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      state.status = "success";
      console.log(payload,"Payload");
      state.products = payload.docs;
      state.pageCount=payload.totalPages;
      state.totoalDocs=payload.totalDocs;
    },
    [getProducts.rejected]: (state,action) => {
      state.status = "rejected";
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;

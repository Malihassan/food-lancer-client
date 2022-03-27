import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { axiosInstance } from "../network/axiosConfig";
import { loadActions } from "./LoadingSlice";
export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (page = 1) => {
    const res = await axiosInstance.get("seller/product/myProducts", {
      params: {
        page: page,
      },
    });
    // dispatch(loadings(false));
    return res.data;
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    // resErrorMes: "",
    pageCount: 1,
    totoalDocs: 0,
    status: null,
  },
  reducers: {},
  extraReducers: {
    [getProducts.pending]: (state, action) => {
      state.status = "loading";
      // const dispatch = useDispatch();
      // dispatch(loadActions.toggelLoader());
    },
    [getProducts.fulfilled]: (state, { payload }) => {
      // const dispatch = useDispatch();
      // dispatch(loadActions.toggelLoader());
      state.status = "success";
      state.products = payload.docs;
      state.pageCount = payload.totalPages;
      state.totoalDocs = payload.totalDocs;
    },
    [getProducts.rejected]: (state, action) => {
      state.status = "rejected";
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;

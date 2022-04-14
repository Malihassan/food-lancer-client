import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, deleteCookie } from "../network/axiosConfig";
import { getCookie } from "../network/axiosConfig";
export const sellerLogin = createAsyncThunk(
  "acount/sellerLogin",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("seller/account/login", {
        email: formData.userEmail,
        password: formData.userPassword,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const buyerLogin = createAsyncThunk(
  "account/buyerLogin",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post("buyer/account/login", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const authenticated = getCookie("token") ? true : false;
const userType = getCookie("userType") ? getCookie("userType") : "viewer";
const _id = getCookie("id") ? getCookie("id") : null;
const authSlice = createSlice({
  name: "acount",
  initialState: {
    authenticated,
    _id,
    userType,
    resErrorMes: "",
    loading: false,
    sellerNotification: [],
    buyerNotification: [],
  },
  reducers: {
    logout: (state, action) => {
      deleteCookie("token");
      deleteCookie("userType");
      deleteCookie("id");
      state.userType = "viewer";
      state.authenticated = false;
      state._id = null;
    },
    setNotification: (state, {payload}) => {
      // console.log(state.userType,"outside");
      if(state.userType === "seller"){
      // console.log(state.userType,"inside");
        state.sellerNotification = payload
        return
      }
      state.buyerNotification = payload
    },
  },
  extraReducers: {
    [sellerLogin.pending]: (state) => {},
    [sellerLogin.fulfilled]: (state, { payload }) => {
      state.authenticated = true;
      state._id = payload._id;
      state.userType = "seller";
      document.cookie = `token=${payload.token}`;
      document.cookie = "userType=seller";
      document.cookie = `id=${payload._id}`;
    },
    [sellerLogin.rejected]: (state, { payload }) => {
      state.resErrorMes = payload.error;
    },

    [buyerLogin.fulfilled]: (state, { payload }) => {
      state.authenticated = true;
      state._id = payload._id;
      state.userType = "buyer";
      document.cookie = `token=${payload.token}`;
      document.cookie = "userType=buyer";
      document.cookie = `id=${payload._id}`;
    },
    [buyerLogin.rejected]: (state, { payload }) => {
      state.resErrorMes = payload.error;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

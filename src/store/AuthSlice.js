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
      const res = await axiosInstance.post("buyer/account/login",formData);
	  console.log(res.data ,'<===========');
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);	
const authenticated = getCookie("token") ? true : false;
const userType = getCookie("userType") ? getCookie("userType") : "viewer";
const authSlice = createSlice({
  name: "acount",
  initialState: {
    authenticated,
    userType,
    resErrorMes: "",
    loading: false,
  },
  reducers: {
    // login: (state) => {
    //   state.authenticated = true;
    // },
    logout: (state, action) => {
      deleteCookie("token");
      deleteCookie("userType");
      state.userType = "viewer";
      state.authenticated = false;
    },
  },
  extraReducers: {
    [sellerLogin.pending]: (state) => {},
    [sellerLogin.fulfilled]: (state, { payload }) => {
      state.authenticated = true;
      state.userType = "seller";
      document.cookie = `token=${payload.token}`;
      document.cookie = "userType=seller";
    },
    [sellerLogin.rejected]: (state, { payload }) => {
      state.resErrorMes = payload.error;
    },

    [buyerLogin.fulfilled]: (state, { payload }) => {
      state.authenticated = true;
      state.userType = "buyer";
      document.cookie = `token=${payload.token}`;
      document.cookie = "userType=buyer";
    },
    [buyerLogin.rejected]: (state, { payload }) => {
      state.resErrorMes = payload.error;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

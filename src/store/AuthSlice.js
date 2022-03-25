import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../network/axiosConfig";

export const login = createAsyncThunk(
  "acount/login",
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

const authSlice = createSlice({
  name: "acount",
  initialState: {
    authenticated: false,
    resErrorMes: "",
    loading: false,
  },
  reducers: {
    // login: (state) => {
    //   state.authenticated = true;
    // },
    // logout: (state,action) => {
    //   state.authenticated = false;
    // },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.authenticated = true;
      console.log("=token=>", payload);
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.resErrorMes = payload.error;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;



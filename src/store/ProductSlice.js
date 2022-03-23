// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import {axiosInstance} from "../network/axiosConfig";

// export const getProducts=createAsyncThunk(
//     'product/getProducts',
//     async ()=>{
//         return axiosInstance
//         .get("/movie/popular", {
//             // params: {
//             //   page: page,
//             // },
//           })
//           .then((res) => {
//               dispatch({
//                   type:"GET_MOVIES_LIST_Page",
//                   payload:res.data.results
//               })
//           })
//           .catch((err) => console.log(err));
//     }
// )

// const productSlice = createSlice({
// 	name: "product",
// 	initialState: {
//         products:[]
// 	},
// 	reducers: {
// 	},
// 	extraReducers: {

//     },
// });

// export const authActions = authSlice.actions;

// export default authSlice.reducer;

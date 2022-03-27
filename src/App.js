import "./App.scss";
import LandingPage from "./pages/landing/LandingPage";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import ProductList from "./components/product/product-list/ProductList";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
//import ProductCard from "./components/shared/product-card/Product-Card";
import UpdateProfile from "./components/seller/UpdateProfile";
import ProductForm from "./components/product/product-form/ProductForm";
import Loader from "./components/shared/loader/Loader";
import NotFound from "./components/shared/not-found-page/NotFound";
import SellerHome from "./pages/sellerHome/SellerHome";

import { getCookie } from "./network/axiosConfig";
import Footer from "./components/shared/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
	const reload = useSelector((state) => state.auth.reload);
	const logged = getCookie("userType") || "viewer";
	console.log(logged);
	useEffect(() => {
		console.log(reload);
	}, [reload]);

	return (
		<>
			<Loader />
			<Routes>
				{logged === "viewer" && (
					<>
						<Route path="/home" element={<Navigate replace to="/" />} />
						<Route path="/" element={<LandingPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
					</>
				)}

				{logged === "seller" && (
					<>
						<Route path="/" element={<Navigate replace to="/home" />} />
						<Route path="/home" element={<SellerHome />} />
						<Route path="/myProducts" element={<ProductList />} />
						<Route
							path="/myProducts/addProduct"
							element={<ProductForm />}
						/>
						{/* // todo: product details + edit product */}
						<Route path="/updateProfile" element={<UpdateProfile />} />
					</>
				)}

				{/* <Route path="login" element={<LoginPage />} /> */}

				{/*
				dynamic routing example
			<Route path="users" element={<Users users={users} />} /> */}
				{/* <Route path="updateProfile" element={<UpdateProfile />} /> */}

				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
		</>
	);
}
export default App;

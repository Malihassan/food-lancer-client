import "./App.scss";
import LandingPage from "./pages/landing/LandingPage";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import SignupPage from "./pages/signup/SignupPage";
import ProductList from "./components/product/product-list/ProductList";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import ResetPassword from "./pages/resetPassword/ResetPassword";
//import ProductCard from "./components/shared/product-card/Product-Card";
import UpdateProfile from "./components/seller/UpdateProfile";
import ProductDetails from "./pages/product/product-details/product-details";
import ProductForm from "./components/product/product-form/ProductForm";
import Loader from "./components/shared/loader/Loader";
//import NotFound from "./components/shared/not-found-page/NotFound";
import SellerHome from "./pages/sellerHome/SellerHome";
import Footer from "./components/shared/Footer";
///import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, fas } from '@fortawesome/free-solid-svg-icons'
import { getCookie } from "./network/axiosConfig";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/shared/Navbar";
library.add(fab, fas, faCheckSquare, faCoffee);
function App() {
	const loading = useSelector((state) => state.loader.loading);
	const reload = useSelector((state) => state.auth.reload);
	const logged = getCookie("userType") || "viewer";
	useEffect(() => {
	}, [reload]);

	return (
		<>
			{loading && <Loader />}
			<Navbar />
			<Routes>
				{logged === "viewer" && (
					<>
						<Route path="/home" element={<Navigate replace to="/" />} />
						<Route path="/" element={<LandingPage />} />
            <Route path="/seller/account/resetPassword/:token" element={<ResetPassword />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
					</>
				)}

				{logged === "seller" && (
					<>
						<Route path="/" element={<Navigate replace to="/home" />} />
            
						<Route path="/home" element={<SellerHome />} />
						<Route path="/updateProfile" element={<UpdateProfile />} />
						<Route path="/myProducts" element={<ProductList />} />
						<Route path="/myProducts/:id" element={<ProductDetails />} />
						<Route
							path="/myProducts/addProduct"
							element={<ProductForm />}
						/>
						{/* // todo: product details + edit product */}
					</>
				)}

				{/*
				dynamic routing example
			<Route path="users" element={<Users users={users} />} /> */}

				<Route path="*" element={<Navigate replace to="/home" />} />
			</Routes>
			<Footer />
		</>
	);
}
export default App;

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
import ProductForm from "./components/product/product-form/ProductForm";
import Loader from "./components/shared/loader/Loader";
import NotFound from "./components/shared/not-found-page/NotFound";

import SellerHome from "./pages/sellerHome/SellerHome";

function App() {
	return (
		<>
			<Loader />
			<Routes>
				<Route path="/" element={<Navigate replace to="/welcome" />} />
				<Route path="/welcome" element={<LandingPage />} />
				<Route
					path="/dishes"
					element={
						<h1>
							HIII! <br />
							My name is Dishes
						</h1>
					}
				/>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/myProducts" element={<ProductList />} />
				<Route path="welcome" element={<LandingPage />} />
				{/* <Route path="login" element={<LoginPage />} /> */}
				<Route path="loader" element={<Loader />} />
				<Route path="/myProducts/addProduct" element={<ProductForm />} />
				{/*
				dynamic routing example
			<Route path="users" element={<Users users={users} />} /> */}
				{/* <Route path="updateProfile" element={<UpdateProfile />} /> */}
				<Route path="/updateProfile" element={<UpdateProfile />} />
				<Route path="signup" element={<SignupPage />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</>
	);
}
export default App;

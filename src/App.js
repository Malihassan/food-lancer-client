import "./App.scss";
import LandingPage from "./pages/landing/LandingPage";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import ProductCard from "./components/shared/product-card/Product-Card";
import ProductList from "./components/product/product-list/ProductList";
import UpdateProfile from "./components/seller/UpdateProfile";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate replace to="/welcome" />} />
			<Route path="welcome" element={<LandingPage />} />
			<Route path="login" element={<LoginPage />} />
			{/*
				dynamic routing example
			<Route path="users" element={<Users users={users} />} /> */}
			<Route path="login" element={<LoginPage />} />
			<Route path="updateProfile" element={<UpdateProfile />} />
			<Route path="signup" element={<SignupPage />} />
			<Route path="product" element={<ProductList />} />
		</Routes>
	);
}
export default App;

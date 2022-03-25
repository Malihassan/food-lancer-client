import "./App.scss";
import LandingPage from "./pages/landing/LandingPage";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import ProductCard from "./components/shared/product-card/Product-Card";
import ProductList from "./components/product/product-list/ProductList";
import UpdateProfile from "./components/seller/UpdateProfile";
import ProductForm from "./components/product/product-form/ProductForm";

function App() {
	return (
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
			<Route path="login" element={<LoginPage />} />
			<Route path="/myProducts/addProduct" element={<ProductForm />} />
			{/*
				dynamic routing example
			<Route path="users" element={<Users users={users} />} /> */}
			<Route path="/updateProfile" element={<UpdateProfile />} />
			<Route path="signup" element={<SignupPage />} />
		</Routes>
	);
}
export default App;

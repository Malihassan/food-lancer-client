import "./App.scss";
import LandingPage from "./pages/landing/LandingPage";
import { Route, Routes, Navigate } from "react-router-dom";
// import LoginPage from "./pages/login/LoginPage";
import SignupPage from './pages/signup/SignupPage';
import LoginPage from "./pages/login/loginPage";
import ProductCard from './components/shared/product-card/Product-Card'
import ProductList from "./components/product/product-list/ProductList";
import ProductDetails from "./pages/product/product-details";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate replace to="/welcome" />} />
			<Route path="/welcome" element={<LandingPage />} />
			<Route path="/login" element={<LoginPage />} />
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
			<Route path="/product/details" element={<ProductDetails/>}/>
      		<Route path="/signup" element={<SignupPage />} />
			<Route path="/product" element={<ProductList />} />
		</Routes>
	);
}
export default App;

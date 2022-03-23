import "./App.scss";
import LandingPage from "./pages/landing/LandingPage";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/loginPage";
import ProductCard from './components/shared/product-card/Product-Card'
import ProductList from "./components/product/product-list/ProductList";

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
		</Routes>
	);
}
export default App;

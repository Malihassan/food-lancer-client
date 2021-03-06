import "./App.scss";
import { io } from "socket.io-client";
import LandingPage from "./pages/landing/LandingPage";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
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
import Footer from "./components/shared/footer/Footer";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./components/shared/nav/Navbar";
import OrderHistory from "./components/order/orderHistory/OrderHistory";
import BuyerProfile from "./components/buyer/BuyerProfile";
import NotFound from "./components/shared/not-found-page/NotFound";
import Favourites from "./components/buyer/Favourites";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

//import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import BuyerHome from "./pages/buyerHome/BuyerHome";
import ProductDetailsBuyer from "./pages/product/product-details-buyer/product-details-buyer";
import BuyerOrder from "./pages/buyer-order/buyer-order";
library.add(fab, fas, far);

function App() {
	const authenticated = useSelector((state) => state.auth.authenticated);
	const loggedAs = useSelector((state) => state.auth.userType);
	const _id = useSelector((state) => state.auth._id);
	const [socket, setSocket] = useState(null);
	// http://localhost:3000/
	//https://food-lancer.herokuapp.com/
	useEffect(() => {
		if (loggedAs !== "viewer") {
			setSocket(
				io("https://food-lancer.herokuapp.com/", {
					query: { type: loggedAs, id: _id },
				})
			);
		}
	}, [authenticated, loggedAs]);

	return (
		<>
			<Loader />
			<Navbar socket={socket} />
			<Routes>
				{loggedAs === "viewer" && !authenticated && (
					<>
						<Route path="/home" element={<LandingPage />} />
						<Route path="/" element={<LandingPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route
							path="/forgetPassword/:userType"
							element={<ForgetPassword />}
						/>
						<Route
							path="/:userType/account/resetPassword/:token"
							element={<ResetPassword />}
						/>
						<Route path="/dishes" element={<BuyerHome />} />
						<Route
							path="/placeOrder"
							element={<Navigate replace to="/login" />}
						/>
						<Route
							path="/product/:id"
							element={<Navigate replace to="/login" />}
						/>
					</>
				)}

				{loggedAs === "seller" && authenticated && (
					<>
						<Route path="/" element={<Navigate replace to="/home" />} />
						<Route
							path="/home"
							element={<SellerHome socket={socket} />}
						/>
						<Route
							path="/seller/home"
							element={<SellerHome socket={socket} />}
						/>
						<Route path="/updateProfile" element={<UpdateProfile />} />
						<Route path="/myProducts" element={<ProductList />} />
						<Route path="/myProducts/:id" element={<ProductDetails />} />
						<Route
							path="/myProducts/addProduct"
							element={<ProductForm />}
						/>
					</>
				)}
				
				{loggedAs === "buyer" && authenticated && (
					<>
						<Route path="/updateProfile" element={<BuyerProfile />} />
						<Route path="/favs" element={<Favourites />} />
						<Route
							path="/myOrders"
							element={<OrderHistory socket={socket} />}
						/>
						<Route path="/home" element={<BuyerHome />} />
						<Route
							path="/product/:id"
							element={<ProductDetailsBuyer />}
						/>
						<Route path="/placeOrder" element={<BuyerOrder />} />
						<Route path="/" element={<Navigate replace to="/home" />} />
					</>
				)}
				
				<Route path="*" element={<NotFound />} />
				{/* <Route path="*" element={<Navigate replace to="/" />} /> */}
				{/* <Route path="/home" element={<BuyerHome />} /> */}
			</Routes>
			<Footer />
		</>
	);
}
export default App;

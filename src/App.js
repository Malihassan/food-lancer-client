import "./App.scss";
import LandingPage from "./pages/landing/LandingPage";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import ProductList from "./components/product/product-list/ProductList";
import ForgetPassword from "./pages/forgetpassword/ForgetPassword";
import ResetPassword from './pages/resetPassword/ResetPassword';
//import ProductCard from "./components/shared/product-card/Product-Card";
import UpdateProfile from "./components/seller/UpdateProfile";
import ProductForm from "./components/product/product-form/ProductForm";
import SellerHome from "./pages/sellerHome/SellerHome";
///import ReactDOM from 'react-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faCheckSquare, faCoffee, fas } from '@fortawesome/free-solid-svg-icons'

library.add( fab,fas,faCheckSquare, faCoffee)

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
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/seller/account/resetpassword/:token" element={<ResetPassword />} />
      <Route path="/myProducts" element={<ProductList />} />
      <Route path="/myProducts/addProduct" element={<ProductForm/>} />
      <Route path="/seller/home" element={<SellerHome/>}/>
      		{/*
				dynamic routing example
			<Route path="users" element={<Users users={users} />} /> */}
			<Route path="updateProfile" element={<UpdateProfile />} />
			<Route path="signup" element={<SignupPage />} />
    </Routes>
  );
}
export default App;

import "../../../variables.scss";
import classes from "./nav.module.scss";
import { axiosInstance } from "../../../network/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArrowRightFromBracket,
  faUser,
  faUtensils,
  faCartShopping,
  faThin,
} from "@fortawesome/free-solid-svg-icons";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdOutlineFavoriteBorder } from "react-icons/md";

import { authActions } from "../../../store/AuthSlice";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import CartOffCanvas from "../../cart/cart-offcanvas/cart-offcanvas";

const Navbar = (props) => {
  const { sendRequest } = useFetch();
  const dispatch = useDispatch();
  const loggedAs = useSelector((state) => state.auth.userType);
  const cartItems = useSelector((state) => state.cartItems)
  const logout = async (type) => {
    sendRequest(
      {
        url: `${type}/account/logout`,
        method: "GET",
      },
      (res) => dispatch(authActions.logout())
    );
  };
  const socket = props.socket;
  const [notification, setNotification] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    socket?.on("updateOrderStatus", (data) => {
      if (data) {
        setNotification(true);
      }
    });
    socket?.on("receiveNotification",(data)=>{
      if (data) {
        console.log(data ,"=<");
        dispatch(authActions.setNotification(data))
        setNotification(true);
      }
    })
    socket?.on("addOrder", (data) => {
      if (data) {
        setNotification(true);
        console.log(data,"data from add order");
      }
      // socket.off("addOrder");
    });

  }, [socket, notification]);

  useEffect(() => {
    if (loggedAs !== 'viewer') {
      sendRequest(
        {
          url: `${loggedAs}/account/notification`,
          method: "GET",
        },
        (res) => {
          console.log(res);
          dispatch(authActions.setNotification(res.data))
          res.data.map((item)=>{
            if (item.order.read === false) {
              setNotification(true)
            }
          })
        }
      );
    }
    
  }, []);

  return (
    <nav
      className={`sticky-top navbar p-0 m-0 ${classes.nav}  d-flex justify-content-between align-items-center`}
    >
      <Link
        to="/seller/home"
        type="button"
        className={`navbar-brand my-3 ps-5 text-light col-sm-3 col-12 fs-3 ${classes.logo}`}
      >
        FoodLancer
      </Link>
      <div
        className={`text-light py-2 mt-2 px-0 col-sm-8 col-12 d-flex align-items-center ${
          loggedAs === "viewer"
            ? "justify-content-end"
            : "justify-content-around"
        } `}
      >
        {loggedAs === "seller" && (
          <div className="col-12 d-flex justify-content-around">
            <Link
              to="/home"
              type="button"
              // onClick={() => setNotification(false)}
              className="lead text-center text-light mx-4 text-decoration-none position-relative"
            >
              {notification && (
                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger rounded-circle"></span>
              )}
              <div className="d-lg-block d-none ">
                <FontAwesomeIcon icon={faHome} />
                <span className="mx-2 ">home</span>
              </div>
              <div className="d-lg-none d-block ">
                <FontAwesomeIcon icon={faHome} />
              </div>
            </Link>

            <Link
              to="/myProducts"
              type="button"
              className="lead text-light mx-4 text-decoration-none"
            >
              <div className="d-lg-block d-none ">
                <FontAwesomeIcon icon={faUtensils} />
                <span className="mx-2  ">My Products</span>
              </div>
              <div className="d-lg-none d-block ">
                <FontAwesomeIcon icon={faUtensils} />
              </div>
            </Link>

            <Link
              to="/updateProfile"
              type="button"
              className="lead text-light mx-4 text-decoration-none"
            >
              <div className="d-lg-block d-none ">
                <FontAwesomeIcon icon={faUser} />

                <span className="mx-2  ">Profile</span>
              </div>
              <div className="d-lg-none d-block ">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </Link>
            <Link
              to="/"
              onClick={() => logout("seller")}
              type="button"
              className="btn btn-outline-warning "
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </Link>
          </div>
        )}

        {loggedAs === "viewer" && (
          <div>
            <Link
              to="/login"
              type="button"
              className="btn btn-outline-light mx-2"
            >
              Log in
            </Link>
            <Link
              to="/signup"
              type="button"
              className="btn btn-outline-warning mx-2"
            >
              Sign up
            </Link>
          </div>
        )}
        {loggedAs === "buyer" && (
          <div className="col-12 d-flex justify-content-around align-items-center">
            <Link
              to="/home"
              type="button"
              className="lead text-center  text-light mx-4 text-decoration-none"
            >
              <div className="d-lg-block d-none ">
                <FontAwesomeIcon icon={faHome} />
                <span className="mx-2 ">home</span>
              </div>
              <div className="d-lg-none d-block ">
                <FontAwesomeIcon icon={faHome} />
              </div>
            </Link>

            <Link
              to="/myOrders"
              type="button"
              onClick={() => setNotification(false)}
              className="lead text-light mx-4 p-2 text-decoration-none position-relative"
            >
              {notification && (
                <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger rounded-circle"></span>
              )}
              <div className="d-lg-block d-none ">
                <FontAwesomeIcon icon={faUtensils} />
                <span className="mx-2  ">My Orders</span>
              </div>
              <div className="d-lg-none d-block ">
                <FontAwesomeIcon icon={faUtensils} />
              </div>
            </Link>

            <Link
              to="/updateProfile"
              type="button"
              className="lead text-light mx-4 text-decoration-none"
            >
              <div className="d-lg-block d-none ">
                <FontAwesomeIcon icon={faUser} />

                <span className="mx-2  ">Profile</span>
              </div>
              <div className="d-lg-none d-block ">
                <FontAwesomeIcon icon={faUser} />
              </div>
            </Link>
            <Link to="/favs" type="button" className="btn btn-outline-light ">
              <MdOutlineFavoriteBorder className="fs-4" />
            </Link>
            <button onClick={() => setShow(true)} type="button" className="btn btn-outline-light position-relative">
              {cartItems.productCount? (
                <span className="position-absolute top-0 start-100 translate-middle px-2 text-small bg-danger rounded-3">{cartItems.productCount}</span>
              ) : <></>}
              <HiOutlineShoppingCart className="fs-4" />
            </button>
            <Link
              to="/"
              onClick={() => logout("buyer")}
              type="button"
              className="btn btn-outline-warning "
            >
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
            </Link>
            <CartOffCanvas controlProps={{show, setShow}}/>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

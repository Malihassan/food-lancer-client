import "../../../variables.scss";
import classes from "./nav.module.scss";
import { axiosInstance } from "../../../network/axiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faArrowRightFromBracket,
	faUser,
	faUtensils,
} from "@fortawesome/free-solid-svg-icons";

import { authActions } from "../../../store/AuthSlice";
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Navbar = ({ bg, buttons }) => {
	const dispatch = useDispatch();
	const loggedAs = useSelector((state) => state.auth.userType);
	const logout = async () => {
		const res = await axiosInstance.get(`seller/account/logout`);
		if (res) {
			dispatch(authActions.logout());
		}
	};

	return (
		<nav
			className={`sticky-top navbar p-0 m-0 ${classes.nav}  d-flex justify-content-between align-items-center`}
		>
			{/* <div className="container-fluid d-flex flex-row flex-wrap justify-content-lg-between justify-content-center"> */}
			<Link
				to="/seller/home"
				type="button"
				className={`navbar-brand my-3 ps-5 text-light col-sm-3 col-12 fs-3 ${classes.logo}`}
			>
				FoodLancer
			</Link>
			<div
				className={`text-light py-2 mt-2 px-0 col-sm-7 col-12 d-flex align-items-center ${
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
							className="lead text-center text-light mx-4 text-decoration-none"
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
							onClick={logout}
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
			</div>
			{/* </div> */}
		</nav>
	);
};

export default Navbar;

import "../../variables.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
	deleteCookie,
	getCookie,
	axiosInstance,
} from "../../network/axiosConfig";
import { useNavigate } from "react-router-dom";

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/AuthSlice";

const Navbar = ({ bg, buttons }) => {
	const dispatch = useDispatch()
	const loggedAs = useSelector((state) => state.auth.userType);
	const logout = async () => {
		const res = await axiosInstance.get(`seller/account/logout`);
		if (res) {
			dispatch(authActions.logout())
		}
	};

	return (
		<nav
			className={"navbar px-0 py-2 ms-0 "}
			style={{
				height: "100%",
				width: "100%",
				backgroundColor: "#091b29"/* "#13334C" */,
				overflow: "hidden",
			}}
		>
			<div className="container-fluid d-flex flex-row flex-wrap justify-content-between">
				<Link
					to="/seller/home"
					type="button"
					className="navbar-brand text-light fs-3"
					style={{
						fontFamily: "Monoton",
						color: "#F0A500",
					}}
				>
					FoodLancer
				</Link>
				<div className="navbar-brand text-light">
					{loggedAs === "seller" && (
						<>
							<Link
								to="/home"
								type="button"
								className="lead text-light mx-4 text-decoration-none"
								style={{
									color: "#DAB88B",
									fontFamily: " 'El Messiri', sans-serif",
								}}
							>
								home
								{/** my orders */}
							</Link>

							<Link
								to="/myProducts"
								type="button"
								className="lead text-light mx-4 text-decoration-none"
								style={{
									color: "#DAB88B",
									fontFamily: " 'El Messiri', sans-serif",
								}}
							>
								My Products
							</Link>

							<Link
								to="/updateProfile"
								type="button"
								className="lead text-light mx-4 text-decoration-none"
								style={{
									color: "#DAB88B",
									fontFamily: " 'El Messiri', sans-serif",
								}}
							>
								Profile
							</Link>
							<Link
								to="/"
								onClick={logout}
								type="button"
								className="btn btn-outline-warning ms-5 me-3"
							>
								<FontAwesomeIcon icon={faArrowRightFromBracket} />
							</Link>
						</>
					)}
					{/* {buttons?.sellerProfile && (
					
					)} */}
					{loggedAs === "viewer" && (
						<>
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
						</>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

import "../../variables.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { axiosInstance } from "../../network/axiosConfig";
import { ReactComponent as Home } from "../../assets/svgs/house-solid.svg";
import { ReactComponent as Products } from "../../assets/svgs/utensils-solid.svg";
import { ReactComponent as Profile } from "../../assets/svgs/user-solid.svg";

import { authActions } from "../../store/AuthSlice";
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
			className={"navbar p-0 ms-0 "}
			style={{
				height: "100%",
				width: "100%",
				backgroundColor: "#0b2a3a" /* "#13334C" */,
				overflow: "hidden",
			}}
		>
			<div className="container-fluid d-flex flex-row flex-wrap justify-content-lg-between justify-content-center">
				<Link
					to="/seller/home"
					type="button"
					className="navbar-brand mx-5 my-3 text-light fs-3"
					style={{
						fontFamily: "Monoton",
						color: "#F0A500",
					}}
				>
					FoodLancer
				</Link>
				<div className="navbar-brand mt-2 d-flex flex-row text-light">
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
								<div className="d-lg-block d-none ">
									<Home fill="white" width="25px" height="25px" />
									<span className="mx-2 ">home</span>
								</div>
								<div className="d-lg-none d-block ">
									<Home fill="white" width="25px" height="25px" />
								</div>
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
								<div className="d-lg-block d-none ">
									<Products fill="white" width="25px" height="25px" />
									<span className="mx-2  ">My Products</span>
								</div>
								<div className="d-lg-none d-block ">
									<Products fill="white" width="25px" height="25px" />
								</div>
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
								<div className="d-lg-block d-none ">
									<Profile fill="white" width="25px" height="25px" />
									<span className="mx-2  ">Profile</span>
								</div>
								<div className="d-lg-none d-block ">
									<Profile fill="white" width="25px" height="25px" />
								</div>
							</Link>
							<Link
								to="/"
								onClick={logout}
								type="button"
								className="btn btn-outline-warning ms-3 me-3"
							>
								<FontAwesomeIcon icon={faArrowRightFromBracket} />
							</Link>
						</>
					)}

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

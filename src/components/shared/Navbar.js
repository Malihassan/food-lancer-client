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
import { useSelector } from "react-redux";

const Navbar = ({ bg, buttons }) => {
	let navigate = useNavigate();
	const reload = useSelector((state) => state.auth.reload);
	useEffect(() => {}, [reload]);
	const logout = async () => {
		const res = await axiosInstance.get(`seller/account/logout`);
		if (res) {
			window.location.reload();
			deleteCookie("userType");
			deleteCookie("token");
			navigate("/");
			document.cookie = "userType=viewer;";
		}
	};
	const logged = getCookie("userType") || "viewer";

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
					{logged === "seller" && (
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
					{logged === "viewer" && (
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

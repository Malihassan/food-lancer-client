import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import React from "react";
import { Link } from "react-router-dom";

import { getCookie } from "../../network/axiosConfig";
const Navbar = ({ bg, buttons }) => {
	const logged = getCookie("userType") || "viewer";

	return (
		<nav
			className={"navbar p-0 ms-0 "}
			style={{
				height: "100%",
				width: "100%",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
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
								to="/signup"
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

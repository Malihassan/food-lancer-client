import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ bg, buttons }) => {
	const logged = "seller";

	return (
		<nav
			className={"navbar p-0 ms-0 "}
			style={{
				height: "7vh",
				width: "100%",
				backgroundColor: "rgba(0, 0, 0, 0.5)",
			}}
		>
			<div className="container-fluid d-flex flex-row flex-wrap justify-content-between">
				<div className="navbar-brand text-light">FoodLancer</div>
				<div className="navbar-brand text-light">
					{logged === "seller" && (
						<>
							<Link
								to="/"
								type="button"
								className="lead  mx-2 text-decoration-none"
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
								className="lead  mx-2 text-decoration-none"
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
								className="lead  mx-2 text-decoration-none"
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
								className="btn btn-outline-warning mx-2"
							>
								Sign Out
							</Link>
						</>
					)}
					{/* {buttons?.sellerProfile && (
					
					)} */}
					{/* {buttons?.login && (
						<Link
							to="/login"
							type="button"
							className="btn btn-outline-light mx-2"
						>
							Log in
						</Link>
					)}

					{buttons?.signup && (
						<Link
							to="/signup"
							type="button"
							className="btn btn-outline-warning mx-2"
						>
							Sign up
						</Link>
					)} */}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ bg, buttons }) => {
	return (
		<nav className={"navbar " + bg} style={{ height: "7vh" }}>
			<div className="container-fluid d-flex flex-row flex-wrap justify-content-between">
				<div className="navbar-brand text-light">FoodLancer</div>
				<div className="navbar-brand text-light">
					{buttons.buyerProfile && (
						<Link
							to="/login"
							type="button"
							className="lead text-light mx-2"
						>
							Profile
						</Link>
					)}
					{buttons.login && (
						<Link
							to="/login"
							type="button"
							className="btn btn-outline-light mx-2"
						>
							Log in
						</Link>
					)}

					{buttons.signup && (
						<Link
							to="/signup"
							type="button"
							className="btn btn-outline-light mx-2"
						>
							Sign up
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

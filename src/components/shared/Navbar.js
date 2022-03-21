import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ bg, buttons }) => {
	return (
		<nav className={"navbar " + bg} style={{ height: "7vh" }}>
			<div className="container-fluid d-flex flex-row flex-wrap justify-content-between">
				<div className="navbar-brand text-light">FoodLancer</div>
				<div className="navbar-brand text-light">
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
						<button type="button" className="btn btn-warning mx-2">
							Sign up
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

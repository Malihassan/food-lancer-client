import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import classes from "./footer.module.css";

function Footer() {
	return (
		<footer className="container-fluid bg-dark text-light">
			<div className="container-fluid">
				<div className="row  justify-content-center">
					<div className="col-md-12 text-center mt-5 d-flex flex-column justify-content-start">
						<h2 className="display-5">FoodLancer.com</h2>
						<div className="menu d-flex mt-4 flex-row justify-content-center">
							<p className="mx-2 text-muted fs-5">Home</p>
							<p className="mx-2 text-muted fs-5">Agent</p>
							<p className="mx-2 text-muted fs-5">About</p>
							<p className="mx-2 text-muted fs-5">Listing</p>
							<p className="mx-2 text-muted fs-5">Blog</p>
							<p className="mx-2 text-muted fs-5">Contact</p>
						</div>
						<div className="mt-3">
							<FontAwesomeIcon icon="fa-brands fa-linkedin-in" />

							<i className="fa-brands fa-linkedin-in">LinkedIN</i>
							<i className="fa-brands fa-linkedin"></i>
						</div>
					</div>
				</div>
				<div className="row mt-2">
					<div className="col-md-12 text-center">
						<p className="copyright">
							Copyright &copy; All rights reserved | This template is
							made with
							<i className="ion-ios-heart" aria-hidden="true"></i> by
							FoodLancer.com
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;

import React from "react";
import { ReactComponent as Facebook } from "../../assets/svgs/facebook-brands.svg";
import { ReactComponent as Linkedin } from "../../assets/svgs/linkedin-brands.svg";
import { ReactComponent as Instagram } from "../../assets/svgs/instagram-brands.svg";

function Footer() {
	return (
		<footer className="container-fluid bg-dark text-light">
			<div className="container-fluid">
				<div className="row  justify-content-center">
					<div className="col-md-12 text-center mt-5  d-flex flex-column justify-content-start">
						<h2
							style={{
								color: "#F0A500",
								fontFamily: " 'El Messiri', sans-serif",
							}}
							className="display-5 my-3 fw-bold"
						>
							FoodLancer.com
						</h2>
						{/* <div className="menu d-flex mt-4 flex-row justify-content-center">
							<p className="mx-2 text-muted fs-5">Home</p>
							<p className="mx-2 text-muted fs-5">Agent</p>
							<p className="mx-2 text-muted fs-5">About</p>
							<p className="mx-2 text-muted fs-5">Listing</p>
							<p className="mx-2 text-muted fs-5">Blog</p>
							<p className="mx-2 text-muted fs-5">Contact</p>
						</div> */}
						<div className="my-5 d-flex justify-content-center">
							<Facebook
								className="mx-4"
								height={"35px"}
								width={"35px"}
								fill={"#F0A500"}
							/>

							<Linkedin
								className="mx-4"
								height={"35px"}
								width={"35px"}
								fill={"#F0A500"}
							/>
							<Instagram
								className="mx-4"
								height={"35px"}
								width={"35px"}
								fill={"#F0A500"}
							/>
						</div>
					</div>
				</div>
				<div className="row mt-3">
					<div className="col-md-12 text-center mb-5">
						<p className="copyright">
							Copyright All rights reserved @2022 |
							<span
								style={{
									color: "#F0A500",
									fontFamily: " 'El Messiri', sans-serif",
								}}
								className="ms-2 fw-light"
							>
								FoodLancer.com
							</span>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

export default Footer;

import React from "react";
import { ReactComponent as Facebook } from "../../../assets/svgs/facebook-brands.svg";
import { ReactComponent as Linkedin } from "../../../assets/svgs/linkedin-brands.svg";
import { ReactComponent as Instagram } from "../../../assets/svgs/instagram-brands.svg";

function Footer() {
	return (
		<footer
			className="container-fluid text-light"
			style={{ backgroundColor: "#091b29"/* "#13334C" */ }}
		>
			<div className="container-fluid">
				<div className="row  justify-content-center">
					<div
						className="col-md-12 text-center mt-3  d-flex flex-column 
					justify-content-center align-items-center"
					>
						<h2
							style={{
								color: "#F0A500",
								fontFamily: " 'El Messiri', sans-serif",
							}}
							className="display-5 fst-italic mt-3  fw-bold"
						>
							FoodLancer
						</h2>
						<div className="menu d-flex  flex-row justify-content-center w-50 ">
							{/* <p className="mx-2 text-muted fs-5">Home</p>
							<p className="mx-2 text-muted fs-5">Agent</p>
							<p className="mx-2 text-muted fs-5">About</p>
							<p className="mx-2 text-muted fs-5">Listing</p>
							<p className="mx-2 text-muted fs-5">Blog</p>
							<p className="mx-2 text-muted fs-5">Contact</p> */}
							<p className=" fw-lighter">
								FoodLancer is a platform made for home cooks and
								home-cooked food lovers, Our goal is to connect both
								sides by creating an online market place specified for
								home-made dishes
							</p>
						</div>
						<div className="mb-4 mt-3 d-flex justify-content-center">
							<Facebook
								role="button"
								className="mx-4"
								height={"35px"}
								width={"35px"}
								fill={"#F0A500"}
							/>

							<Linkedin
								role="button"
								className="mx-4"
								height={"35px"}
								width={"35px"}
								fill={"#F0A500"}
							/>
							<Instagram
								role="button"
								className="mx-4"
								height={"35px"}
								width={"35px"}
								fill={"#F0A500"}
							/>
						</div>
					</div>
				</div>
				<div className="row fst-italic  mt-1">
					<div className="col-md-12 text-center mb-3">
						<p className="copyright">
							Copyright All rights reserved @2022 |
							<span
								style={{
									color: "#F0A500",
									fontFamily: " 'El Messiri', sans-serif",
								}}
								role="button"
								className="ms-2 fw-light text-decoration-underline"
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

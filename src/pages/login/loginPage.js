import "./LoginPage.css";
import React from "react";

import LoginSeller from "../../components/auth/seller/loginComponent/LoginSeller";

function LoginPage() {
	return (
		<>
			<div className="d-flex p-5 align-items-center loginpage-container">
				<div className="col-xl-4 signup ">
					<nav className="">
						<div
							className="nav nav-tabs tabs-button"
							id="nav-tab"
							role="tablist"
						>
							<button
								className="nav-link nav-button active"
								id="nav-home-tab"
								data-bs-toggle="tab"
								data-bs-target="#nav-home"
								type="button"
								role="tab"
								aria-controls="nav-home"
								aria-selected="true"
							>
								Login as Seller
							</button>
							<button
								className="nav-link nav-button"
								id="nav-profile-tab"
								data-bs-toggle="tab"
								data-bs-target="#nav-profile"
								type="button"
								role="tab"
								aria-controls="nav-profile"
								aria-selected="false"
							>
								Login as Buyer
							</button>
						</div>
					</nav>
					<div className="tab-content " id="nav-tabContent">
						<div
							className="tab-pane fade show active"
							id="nav-home"
							role="tabpanel"
							aria-labelledby="nav-home-tab"
						>
							<LoginSeller></LoginSeller>
						</div>
						<div
							className="tab-pane fade"
							id="nav-profile"
							role="tabpanel"
							aria-labelledby="nav-profile-tab"
						>
							blahhhhhhhh
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
export default LoginPage;

import React from "react";
import img1 from "../../assets/imgs/landing page/bg-1.jpeg";
const LandingPage = () => {
	return (
		<div
			style={{
				backgroundImage: `url(${img1})`,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "100% 100%",
				backgroundSize: "cover",
				backgroundPositionX: "100%",
				backgroundPositionY: "65%",
				width: "100vw",
				height: "100vh",
				overflow: "hidden",
			}}
			className="container-fluid"
		>
			<div className="row">
				<div
					className="col-5 text-light"
					style={{ height: "200px", position: "absolute", top: "13%" }}
				>
					{/* <div className="lh-base fs-4 ">
						Food Lancer is a platform for home cooks who desire to sell
						their dishes online to individuals and furnish freshly home
						made food, Want to enjoy a home-made meal ?
					</div> */}
					<div className="lh-base">
						<p
							className="lh-base display-5"
							style={{
								color: "#F0A500",
								fontFamily: " 'El Messiri', sans-serif",
							}}
						>
							Craving for a Delicious home-made Dish?
						</p>
						<p
							className="lh-base fs-2 fw-light"
							style={{
								fontFamily: "'Cabin Sketch', cursive",
							}}
						>
							Try a FoodLancer.
						</p>
					</div>
					<br /> <br />
					<button type="button" className="btn btn-lg btn-outline-light">
						<strong>View Dishes</strong>
					</button>
				</div>
			</div>
		</div>
	);
};

export default LandingPage;

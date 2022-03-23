import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/imgs/landing page/bg-1.jpeg";
import img2 from "../../assets/imgs/landing page/bg-2.jpeg";
import Navbar from "../../components/shared/Navbar";
import classes from "./landingsStyle.module.css";

const LandingPage = () => {
	const buttons = {
		signup: true,
		login: true,
		sellerProfile: true,
	};
	const pageArr = [
		{ text: "Craving a Delicious home-made Dish?", img: img1 },
		{ text: "Want to sell your freshly home-made dishes online?", img: img2 },
	];
	const [text, setText] = useState(pageArr[0].text);
	const [img, setImg] = useState(pageArr[0].img);

	useEffect(() => {
		const timer = setInterval(() => {
			if (text === pageArr[0].text) {
				setText(pageArr[1].text);
				setImg(pageArr[1].img);
			} else {
				setText(pageArr[0].text);
				setImg(pageArr[0].img);
			}
		}, 4000);

		return () => clearInterval(timer);
	}, [text]);

	return (
		<>
			<div
				style={{
					backgroundImage: `url(${img})`,
				}}
				className={`container-fluid  ${classes.bgImg} `}
			>
				<Navbar bg="bg-transparent" buttons={buttons} />
				<div className={`d-lg-block d-none ${classes.overLay}`}></div>
				<div className="row">
					<div
						className="col-md-7 col-lg-5 text-light"
						style={{ height: "200px", position: "absolute", top: "25%" }}
					>
						<div className="lh-base d-flex flex-column align-items-center">
							<div
								className="lh-base display-5 ms-5 text-center "
								style={{
									color: "#F0A500",
									fontFamily: " 'El Messiri', sans-serif",
								}}
							>
								{text}
								<hr />
							</div>
							<p
								className="lh-base fs-2 fw-light"
								style={{
									fontFamily: "'Cabin Sketch', cursive",
								}}
							>
								Try FoodLancer
							</p>
							<br />
							<Link
								to="/dishes"
								type="button"
								className="btn btn-lg btn-outline-light mt-4  "
							>
								<strong>View Dishes</strong>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LandingPage;

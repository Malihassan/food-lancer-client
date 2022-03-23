import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import classes from "./product-card.module.scss";
import jpg from "../../../assets/imgs/landing page/prdImg.PNG";
import jpg1 from "../../../assets/imgs/landing page/bg-1.jpeg";
import jpg2 from "../../../assets/imgs/landing page/bg-2.jpeg";

export default function ProductCard() {
	const [ratingValue, setRatingValue] = useState(0);
	const handleRating = (rate) => {
		setRatingValue(rate);
	};
	return (
		<div className={`${classes.cardColor} shadow-sm`}>
			<div className="position-relative">
				<div className={`${classes.imageContainer}`}>
					<div
						id="carouselExampleSlidesOnly"
						class="carousel slide"
						data-bs-ride="carousel"
					>
						<div class="carousel-inner">
							<div class="carousel-item active">
								<img
									src={jpg1}
									class="d-block w-100"
									style={{ height: "365px" }}
									alt="..."
								/>
							</div>
							<div class="carousel-item">
								<img
									src={jpg}
									class="d-block w-100"
									style={{ height: "365px" }}
									alt="..."
								/>
							</div>
							<div class="carousel-item">
								<img
									src={jpg2}
									class="d-block w-100"
									style={{ height: "365px" }}
									alt="..."
								/>
							</div>
						</div>
					</div>
					{/* <img
            className="card-img-top p-3"
            id="productImage "
            alt="..."
            src={jpg}
          /> */}
				</div>
			</div>
			<Rating
				className={`${classes.test}`}
				transition
				//    showTooltip
				onClick={handleRating}
				ratingValue={ratingValue}
				allowHalfIcon
				size={20}
				//    fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
				fillColorArray={[
					"red",
					"red",
					"red",
					"red",
					"orange",
					"orange",
					"orange",
					"yellow",
					"yellow",
					"yellow",
				]}
			/>
			<div className="card-body">
				<h5
					className={`${classes.prdh5} ${classes.productName} card-title`}
				>
					Mashrom Pizza Medium
				</h5>
				<h6 className={`${classes.prdh6} ${classes.userName} card-title`}>
					Bilal Ahmed
				</h6>
				<p
					id={`${classes.productDescription}`}
					className={`${classes.prdP} card-text my-2`}
				>
					A topping of spicy barbeque sauce, diced chicken, cilantro,
					peppers, and onion all covered with cheese, and baked to bubbly
					goodness!
				</p>
				<div className="d-flex justify-content-between align-items-center">
					<span className={`${classes.prdSpan} ${classes.productPrice}`}>
						EGP 50
					</span>
					<button
						className={`${classes.prdButton} card-link btn btn-outline-dark my-2`}
					>
						Detailes
					</button>
				</div>
			</div>
		</div>
	);
}

import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import { axiosInstance } from "../../../network/axiosConfig";
import classes from "./product-card.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { productActions } from "../../../store/ProductSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const MAX_LENGTH = 125;
	const { product } = props;
	const [ratingValue, setRatingValue] = useState(0);
	const [count, setCount] = useState(0);
	const [mousedOver, setMousedOver] = useState(false);
	const images = product?.image;
	const dispatch = useDispatch();
	useEffect(() => {
		if (mousedOver) {
			const timer = setInterval(() => {
				setCount((prevCount) => (prevCount + 1) % images.length);
			}, 1000);
			return () => clearInterval(timer);
		} else {
			setCount(0);
		}
	}, [mousedOver]);
	const deleteProduct = async (prdID) => {
		const res = await axiosInstance.delete(`seller/product/${prdID}`);
		dispatch(productActions.deleted());
		console.log(res, "res");
	};
	const handleRating = (rate) => {
		setRatingValue(rate);
	};
	return (
		<div className={`${classes.cardColor} shadow-sm `}>
			<div className="position-relative">
				<div
					onMouseOver={() => setMousedOver(true)}
					onMouseOut={() => setMousedOver(false)}
					className={`${classes.imageContainer} p-2`}
				>
				
        <img
						src={images ? images[count].url : ""}
						alt="..."
						style={{ height: "100%", width: "100%" }}
					/>
       
				</div>
			</div>
			<div className="d-flex justify-content-between">
				<Rating
					className={`${classes.stars}`}
					transition
					readonly
					// onClick={handleRating}
					ratingValue={product?.avgRate * 20}
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
				<h5 className={`${classes?.rating} ps-2 col-2 `}>
					{product?.avgRate} / 5
				</h5>
			</div>
			<div className="card-body">
				<h5
					className={`${classes.prdh5} ${classes.productName} card-title`}
				>
					{product?.name}
				</h5>
				<h6 className={`${classes.prdh6} ${classes.userName} card-title`}>
					{product?.sellerId.userName}
				</h6>
			{/* 	<p
					id={`${classes.productDescription}`}
					className={`${classes.prdP} card-text my-2`}
				>
					{product?.description}
				</p> */}
          {product.description.length > MAX_LENGTH ?
        (
          <div className={`${classes.prdP } ${classes.productDescription} card-text my-2`}>
            {`${product.description.substring(0, MAX_LENGTH)}...`}<Link  to={`${product?._id}`}>read more</Link>
          </div>
        ) :
        <p >{product.description}</p>
      }
				<div className="d-flex justify-content-between align-items-center">
					<span className={`${classes.prdSpan} ${classes.productPrice}`}>
						EGP {product?.price}
					</span>
					<div>
						{/* <button
              className={`${classes.prdButton} card-link btn btn-outline-dark my-2 text-danger`}
              onClick={() => {
                deleteProduct(product._id);
              }}
            >
              Delete
            </button> */}
						<Link
							className={`${classes.prdButton} card-link btn my-2`}
							to={`${product?._id}`}
						>
							Detailes
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

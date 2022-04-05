import React from "react";
import classes from "./BuyerProduct.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
function BuyerProductCard(props) {
	const MAX_LENGTH = 125;
	const { product } = props;
	return (
		<>
			<div className={` mt-5 position-relative `}>
				<div className={` col-xl-10 m-auto ${classes.cardContainer} `}>
					<button
						onClick={() => {
							props.handleFavClick(product);
						}}
						className={`btn  ${classes.iconContainerFav}`}
					>
						<FontAwesomeIcon
							icon={`fa-solid fa-heart ${
								props.fav ? "fa-solid" : "fa-regular"
							}`}
						/>
					</button>
					{/* <div className={` ${classes.iconContainerCart}`} ><FontAwesomeIcon icon="fa-solid fa-cart-shopping" /></div> */}
					<div className={`${classes.imageContainer} `}>
						<img alt="foodimage" src={product.image[0].url} />
					</div>
					<div className={`${classes.cardInfo} `}>
						<h4 className={`${classes.productName} `}>{product.name}</h4>
						<h5 className={`${classes.productSeller} `}>
							<b>By</b> {product?.sellerId?.userName}
						</h5>
						{/* <h5 className={`${classes.productCategory} `}>{product?.categoryId?.name}</h5> */}

						{product.description.length > MAX_LENGTH ? (
							<div className={`${classes.productDescription}`}>
								{`${product.description.substring(0, MAX_LENGTH)}....`}
								<Link to={`${product?._id}`}>read more</Link>
							</div>
						) : (
							<div className={`${classes.productDescription}`}>
								{product.description}....
								<Link to={`${product?._id}`}>read more</Link>
							</div>
						)}

						<h5 className={`${classes.productPrice} `}>
							{product.price.toFixed(2)} L.E
						</h5>
						<div className={`d-flex justify-content-center mt-2 mb-4`}>
							<button
								className={` btn ${classes.productButton} mx-auto px-4 mb-4`}
							>
								Add To Cart
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default BuyerProductCard;
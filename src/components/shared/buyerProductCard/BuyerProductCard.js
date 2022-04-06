import React,{useState} from 'react'
import classes from "./BuyerProduct.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Rating } from "react-simple-star-rating";
function BuyerProductCard(props) {
  //const [ratingValue, setRatingValue] = useState(0);
  const MAX_LENGTH = 125;
  const { product } = props;
  return (
    <>
      <div className={`mt-5 position-relative `}>
    <div className={`col-xl-10 m-auto ${classes.cardContainer} `}>
    <button
						onClick={() => {
							props.handleFavClick(product, props.fav);
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
       <div className={`${classes.imageContainer} `}><img alt="foodimage" src={product.image[0].url}/></div>
       <div className={`${classes.cardInfo} mt-2`}>
       <div className="d-flex justify-content-between mb-2">
				<Rating
					className={`${classes.stars}`}
					transition
					readonly
					ratingValue={product?.avgRate * 20}
					allowHalfIcon
					size={20}
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
			</div>
<h4  className={`${classes.productName} `}>{product.name}</h4>
{/* <FontAwesomeIcon icon="fa-regular fa-user" /> */}
<h5 className={`${classes.productSeller} fw-light`}><FontAwesomeIcon className={`${classes.icon}`} icon="fa-regular fa-user" /> {product?.sellerId?.userName}</h5>
{/*  <h5 className={`${classes.productCategory} `}>{product?.categoryId?.name}</h5>  */}

						{product.description.length > MAX_LENGTH ? (
							<div className={`${classes.productDescription}`}>
								{`${product.description.substring(0, MAX_LENGTH)}....`}
								<Link to={`/product/${product?._id}`}>read more</Link>
							</div>
						) : (
							<div className={`${classes.productDescription}`}>
								{product.description}....
								<Link to={`/product/${product?._id}`}>read more</Link>
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

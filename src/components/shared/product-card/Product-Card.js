import React, { useState, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import classes from "./product-card.module.scss";
import jpg from "../../../assets/imgs/landing page/prdImg.PNG";
import jpg1 from "../../../assets/imgs/landing page/bg-1.jpeg";
import jpg2 from "../../../assets/imgs/landing page/bg-2.jpeg";

export default function ProductCard(props) {
  const { product } = props;
  const [ratingValue, setRatingValue] = useState(0);
  const [count, setCount] = useState(0);
  const [mousedOver, setMousedOver] = useState(false);
  const images = [jpg, jpg1, jpg2];

  useEffect(() => {
    if (mousedOver) {
      const timer = setInterval(() => {
        setCount((prevCount) => (prevCount + 1) % 3);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCount(0);
    }
  }, [mousedOver]);

  const handleRating = (rate) => {
    setRatingValue(rate);
  };
  const handelChangePhotos = (ev) => {
    const childs = ev.currentTarget.children;
    for (let index = 0; index < childs.length; index++) {
      if (childs[index].className.split(" ").includes("active")) {
        childs[index].classList.remove("active");
        childs[1].classList.add("active");
      }
      // else
      // {
      //   childs[index].classList.add('active')
      // }
    }
  };
  console.log(product.avgRate, "Avg Rate");
  return (
    <div className={`${classes.cardColor} shadow-sm`}>
      <div className="position-relative">
        <div
          onMouseOver={() => setMousedOver(true)}
          onMouseOut={() => setMousedOver(false)}
          className={`${classes.imageContainer}`}
        >
          <img src={images[count]} style={{ height: "365px", width: "100%"}} />
        </div>
      </div>
      <div className="d-flex justify-content-between">
        <Rating
          className={`${classes.stars}`}
          transition
          readonly
          onClick={handleRating}
          ratingValue={product.avgRate * 20}
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
        <h5 className={`${classes.rating} ps-2 col-2`} >{product.avgRate} / 5</h5>
      </div>
      <div className="card-body">
        <h5 className={`${classes.prdh5} ${classes.productName} card-title`}>
          {product.name}
        </h5>
        <h6 className={`${classes.prdh6} ${classes.userName} card-title`}>
          {product.sellerId.userName}
        </h6>
        <p
          id={`${classes.productDescription}`}
          className={`${classes.prdP} card-text my-2`}
        >
          {product.description}
        </p>
        <div className="d-flex justify-content-between align-items-center">
          <span className={`${classes.prdSpan} ${classes.productPrice}`}>
            EGP {product.price}
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

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../../assets/imgs/landing page/bg-1.jpeg";
import img2 from "../../assets/imgs/landing page/bg-2_ccexpress.jpeg";
import classes from "./landingsStyle.module.css";

const pageArr = [
  { text: "Craving a Delicious home-made Dish?", img: img1 },
  { text: "Want to sell your home-made dishes online?", img: img2 },
];
const LandingPage = () => {
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
      <div
        style={{
          backgroundImage: `url(${img})`,
        }}
        className={`container-fluid mx-0 d-flex justify-content-center justify-content-md-start ${classes.bgImg} `}
      >
        <div className={`row mt-5 ms-md-5  ${classes.overLay} `}>
            <div
              className={`text-light col-10  ${classes["overlay-text"]}`}
            >
              <div className="lh-base d-flex flex-md-column  align-items-center">
                <div className="lh-base text-center ">
                  <div
                    className="lh-base mt-3 display-5 ms-5 "
                    style={{
                      color: "#F0A500",
                      fontFamily: " 'El Messiri', sans-serif",
                    }}
                  >
                    {text}
                    <hr />
                  </div>
                  <p
                    className="lh-base fs-2 ms-3 fw-light"
                    style={{
                      fontFamily: "'Cabin Sketch', cursive",
                    }}
                  >
                    Try FoodLancer
                  </p>
                  <Link
                    to="/home"
                    type="button"
                    className="btn btn-lg btn-outline-light mt-1 ms-3 "
                  >
                    <strong>View Dishes</strong>
                  </Link>
                </div>
              </div>
            </div>
        </div>
      </div>
  );
};

export default LandingPage;

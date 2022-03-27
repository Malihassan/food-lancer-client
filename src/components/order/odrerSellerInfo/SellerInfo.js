import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faLock,
  faHouseUser,
  faCartShopping,
  faExclamationCircle,
  faCartArrowDown,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./sellerInfo.module.scss";
import img from "../../../assets/imgs/landing page/cheif.png";

function SellerInfo(props) {
  return (
    <section className={` ${classes.sellerInfContainer} mt-4  shadow bg-light`}>
      <img
        className="w-h-even rounded-circle d-none d-md-block"
        src={img}
      />
      <div className={`${classes.nameContainer}`}>
        <label className={`${classes.textDark}`}>{props.userInfo.name}</label>
        <div>
          <label>
            <FontAwesomeIcon icon={faHouseUser} />
            {props.userInfo.coverageArea}
          </label>
          {props.userInfo.status === "active" && (
            <label className="mx-3">
              <FontAwesomeIcon className="text-primary" icon={faCircleCheck} />{" "}
              active
            </label>
          )}
          {props.userInfo.status === "blocked" && (
            <label>
              <FontAwesomeIcon className="text-danger mx-1" icon={faLock} />
              blocked
            </label>
          )}
        </div>
      </div>
      <div className={`${classes.cardInfo} `}>
        <FontAwesomeIcon className={`${classes.icon}`} icon={faCartArrowDown} />
        <div>
          <label>Order deliver</label>
          <h4>{props.userInfo.countDeliverOrder}</h4>
        </div>
      </div>
      <div className={`${classes.cardInfo}`}>
        <FontAwesomeIcon
          className={`${classes.icon} `}
          icon={faExclamationCircle}
        />
        <div>
          <label>Order InProgress</label>
          <h4>{props.userInfo.inprogressDeliver}</h4>
        </div>
      </div>
      <div>
        <div className={`${classes.cardInfo} `}>
          <FontAwesomeIcon className={`${classes.icon}`} icon={faStar} />
          <div>
            <label>rating</label>
            <h4>{props.userInfo.rate}</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
export default SellerInfo;

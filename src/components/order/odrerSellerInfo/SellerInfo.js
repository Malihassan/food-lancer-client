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

function SellerInfo(params) {
	return (
		<section
			className={` ${classes.sellerInfContainer} mt-4  shadow bg-light`}
		>
			<img
				className="w-h-even rounded-circle d-none d-md-block d-lg-none"
				src={img}
			/>
			<div className={`${classes.nameContainer}`}>
				<label className={`${classes.textDark}`}>momen zakaria</label>
				<div>
					<label>
						<FontAwesomeIcon icon={faHouseUser} />
						New Assuit
					</label>
					{true && (
						<label className="mx-3">
							<FontAwesomeIcon
								className="text-primary"
								icon={faCircleCheck}
							/>{" "}
							active
						</label>
					)}
					{false && (
						<label>
							<FontAwesomeIcon
								className="text-danger mx-1"
								icon={faLock}
							/>
							blocked
						</label>
					)}
				</div>
			</div>
			<div className={`${classes.cardInfo} `}>
				<FontAwesomeIcon
					className={`${classes.icon}`}
					icon={faCartArrowDown}
				/>
				<div>
					<label>food deliver</label>
					<h4>25%</h4>
				</div>
			</div>
			<div className={`${classes.cardInfo}`}>
				<FontAwesomeIcon
					className={`${classes.icon} `}
					icon={faExclamationCircle}
				/>
				<div>
					<label>food Pending</label>
					<h4>75%</h4>
				</div>
			</div>
			<div>
				<div className={`${classes.cardInfo} `}>
					<FontAwesomeIcon className={`${classes.icon}`} icon={faStar} />
					<div>
						<label>rating</label>
						<h4>3.5</h4>
					</div>
				</div>
			</div>
		</section>
	);
}
export default SellerInfo;

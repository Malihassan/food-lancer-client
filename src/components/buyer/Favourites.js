import React, { useEffect, useState } from "react";
import classes from "./../../pages/buyerHome/buyerHome.module.scss";
//import { axiosInstance } from "../../network/axiosConfig";
import Empty from "../shared/emptyData/Empty";
import BuyerProductCard from "../shared/buyerProductCard/BuyerProductCard";
//import classes from "../product/product-list/product-list.module.scss";
import useFetch from "../../hooks/useFetch";
import { axiosInstance } from "../../network/axiosConfig";

function Favourites() {
	const { sendRequest /* , hasError */ } = useFetch();
	const [productsArr, setProductsArr] = useState([]);
	useEffect(() => {
		// (async () => {
		// 	const res = await axiosInstance.get(`buyer/product/favs`);
		// 	setProductsArr(res.data);
		// })();

		sendRequest(
			{
				url: `buyer/product/favs`,
				method: "GET",
			},
			(res) => {
				setProductsArr(res.data);
			}
		);
	}, []);

	const handleFavClick = (e) => {
		// (async () => {
		// 	const res = await axiosInstance.delete(`buyer/product/favs`, {
		// 		data: { id: e._id },
		// 	});
		// 	setProductsArr(res.data);
		// })();
		sendRequest(
			{
				url: `buyer/product/favs`,
				method: "DELETE",
				body: {
					id: e._id,
				},
			},
			(res) => {
				setProductsArr(res.data);
			}
		);
	};

	const renderList = () => {
		const renderedList = productsArr.map((prd) => {
			return (
				<div
					key={prd._id}
					className={`col-xl-4 col-lg-6 col-md-6 col-sm-8 ${classes.colsDesign}`}
				>
					<BuyerProductCard
						product={prd}
						fav={true}
						userType={"buyer"}
						handleFavClick={handleFavClick}
					/>
				</div>
			);
		});
		return renderedList;
	};

	return (
		<>
			<div className={`${classes.homeBody} `}>
				<div className={`${classes.container} container my-0`}>
					{productsArr.length === 0 && <Empty />}
					{productsArr.length !== 0 && (
						<div>
							<div
								className={`row justify-content-lg-start justify-content-md-center justify-content-sm-center `}
							>
								{renderList()}
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default Favourites;

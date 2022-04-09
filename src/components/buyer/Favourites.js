import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../network/axiosConfig";
import Empty from "../shared/emptyData/Empty";
import BuyerProductCard from "../shared/buyerProductCard/BuyerProductCard";
import classes from "../product/product-list/product-list.module.scss";
import useFetch from "../../hooks/useFetch";

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
					className={`card col-lg-4 col-md-6 col-12 py-3 ${classes.cardPrd}`}
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
			<div className="container-fluid">
				{productsArr.length === 0 && <Empty />}
				{productsArr.length !== 0 && (
					<div className="row bg-transparent">{renderList()}</div>
				)}
			</div>
		</>
	);
}

export default Favourites;

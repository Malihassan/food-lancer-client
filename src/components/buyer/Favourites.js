import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../network/axiosConfig";
import Empty from "../shared/emptyData/Empty";
import ProductCard from "../shared/product-card/Product-Card";
import classes from "../product/product-list/product-list.module.scss";

function Favourites() {
	const [productsArr, setProductsArr] = useState([]);
	useEffect(() => {
		(async () => {
			const res = await axiosInstance.get(
				`http://localhost:3000/buyer/product/favs`
			);
			setProductsArr(res.data);
			console.log(res.data);
		})();
	}, []);

	const handleFavClick = (e) => {
		(async () => {
			const res = await axiosInstance.delete(
				`http://localhost:3000/buyer/product/favs`,
				{ data: { id: e._id } }
			);
			console.log(res);
		})();
		console.log("clicked", e, e._id);
	};

	const renderList = () => {
		const renderedList = productsArr.map((prd) => {
			return (
				<div
					key={prd._id}
					className={`card col-lg-4 col-md-6 col-12 py-3 ${classes.cardPrd}`}
				>
					<ProductCard
						product={prd}
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

import ProductTabs from "../../../components/product/product-tabs.js/product-tabs";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../network/axiosConfig";
import { useParams } from "react-router-dom";
import "./product-details.scss";
import ProductEditPanel from "../../../components/product/product-edit-panel/product-edit-panel";

function ProductDetails() {
	const [productData, setProductData] = useState({});
	const param = useParams();

	useEffect(() => {
		axiosInstance
			.get(`seller/product/${param.id}`)
			.then((data) => {
				console.log(data);
				setProductData(data.data);
			})
			.catch((e) => console.log(e));
	}, []);
	return (
		<div className="container-fluid bg-yellow p-1 g-0 d-flex justify-content-center align-items-center min-vh-100">
			<div className="card" style={{ width: "80rem" }}>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<ProductEditPanel data={productData} />
					</li>
					<li className="list-group-item">
						<ProductTabs data={productData} />
					</li>
				</ul>
			</div>
		</div>
	);
}

export default ProductDetails;
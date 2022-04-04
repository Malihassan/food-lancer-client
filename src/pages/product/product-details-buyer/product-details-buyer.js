import ProductTabs from "../../../components/product/product-tabs.js/product-tabs";
import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../network/axiosConfig";
import { useParams } from "react-router-dom";
import "./product-details-buyer.scss";
import useFetch from "../../../hooks/useFetch";
import ProductInfo from "../../../components/product/product-info/product-info"
function ProductDetailsBuyer() {
  const { sendRequest } = useFetch();
  const [productData, setProductData] = useState({});
  const param = useParams();
  async function prdoductDataHandler(res) {
    if (res.status === 200) {
      console.log(res);
      setProductData(res.data);
    }
  }

	useEffect(() => {
	/* 	axiosInstance
			.get(`seller/product/${param.id}`)
			.then((data) => {
				console.log(data);
				setProductData(data.data);
			})
			.catch((e) => console.log(e)); */
      sendRequest(
        {
          method: "GET",
          url: `buyer/product/${param.id}`,
        },
        prdoductDataHandler
      );
    
	}, []);
	return (
		<div className="container-fluid productDetailesContainer  px-5 p-1 g-0 d-flex justify-content-center align-items-center min-vh-100 ">
			<div className="card border-0  bg-transparent" style={{ width: "80rem" }}>
				<ul className="list-group list-group-flush ">
					<li className="list-group-item mx-5">
						<ProductInfo data={productData} />
					</li>
					<li className="list-group-item mx-5 ">
						<ProductTabs data={productData} />
					</li>
				</ul>
			</div>
		</div>
	);
   

}

export default ProductDetailsBuyer;

import ProductTabs from "../../../components/product/product-tabs.js/product-tabs";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./product-details-buyer.scss";
import useFetch from "../../../hooks/useFetch";
import BuyerProductCard from "./../../../components/shared/buyerProductCard/BuyerProductCard";
import ProductInfo from "../../../components/product/product-info/product-info";
import classes from "./../../buyerHome/buyerHome.module.scss";
/* import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

	faCircleArrowLeft,
	faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons"; */
import Empty from './../../../components/shared/emptyData/Empty';
function ProductDetailsBuyer() {
	const { sendRequest } = useFetch();
	const [productData, setProductData] = useState({});
  const [sellerProducts, setSellerProducts] = useState([]);
  const [sellerId, setSellerId] = useState();
	const param = useParams();
	async function prdoductDataHandler(res) {
    console.log(res);
		if (res.status === 200) {
			setProductData(res.data);
      setSellerId(res.data.sellerId._id)
		}
    
	}
  async function getSellerProducts(res) {
    console.log(res);
	if (res.status === 200) {
			setSellerProducts(res.data);
		}
	}  
 
	useEffect(() => {
		sendRequest(
			{
				method: "GET",
				url: `buyer/product/details/${param.id}`,
			},
			prdoductDataHandler
		);
	}, []);
   useEffect(() => {
     console.log(sellerId);
     if (sellerId!==undefined) {
      sendRequest(
        {
          method: "GET",
          url: `buyer/product/${sellerId}/sellerProducts`,
        },
        getSellerProducts
      );
     }
     console.log(productData?.sellerId?._id);
     console.log(sellerId);
	
	}, [sellerId,productData,sendRequest]);  
 
	return (
	<div className={`${classes.homeBody} `}>
    	<div className="container-fluid productDetailesContainer px-5 p-1 g-0 d-flex justify-content-center align-items-center min-vh-100 ">
			<div
				className="card border-0"
				style={{ width: "80rem" }}
			>
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
        
        <div className={`${classes.container} container  my-0`}>
    {sellerProducts?.length===0 && <Empty />}  
     {sellerProducts?.length!==0 && ( 
      
      <div className={`row justify-content-lg-start justify-content-md-center justify-content-sm-center  `}>
      {sellerProducts?.map((prd) => { 
       return (
         <div
           key={prd._id} 
           className={`col-xl-4 col-lg-6 col-md-6 col-sm-8 ${classes.colsDesign}`}
         >
            <BuyerProductCard product={prd} /> 
         </div>
       );
      })} 
   </div>
       
      
  
     )} 
       
     
    </div>
      
  </div>
	);
}

export default ProductDetailsBuyer;

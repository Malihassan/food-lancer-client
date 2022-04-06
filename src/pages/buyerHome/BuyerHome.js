import classes from "./buyerHome.module.scss";
import React, { useEffect, useState } from "react";
import { IoFilterOutline } from "react-icons/io5";
import { Rating } from "react-simple-star-rating";
import BuyerProductCard from "./../../components/shared/buyerProductCard/BuyerProductCard";
import useFetch from "../../hooks/useFetch";
import Empty from "./../../components/shared/emptyData/Empty";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OffCanvas from "./../../components/shared/offCanvas/OffCanvas";
import {
	faCircleArrowLeft,
	faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";
// import Box from "@mui/material/Box";
// import Slider from "@mui/material/Slider";
/* function valuetext(value) {
  //console.log(value);
  return `${value}°C`;
} */
function BuyerHome() {
	const handelPageClick = async (data) => {
		let currentPage = data.selected + 1;
		setPage(currentPage);
	};

	const { sendRequest /* , hasError */ } = useFetch();
	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState("");
	const [page, setPage] = useState(1);
	const [favs, setFavs] = useState([]);
	useEffect(() => {
		function getAllProduct(res) {
			setProducts(res?.data.docs);
			setTotalPages(Math.ceil(res?.data.totalPages));
		}
		function getFavs(res) {
			setFavs(res.data);
		}

		sendRequest(
			{
				url: `buyer/product/allProducts`,
				method: "GET",
				params: { page },
			},
			getAllProduct
		);
		sendRequest(
			{
				url: `buyer/product/favs`,
				method: "GET",
			},
			getFavs
		);
	}, [page, sendRequest]);

	const handleFavClick = (product, favStatus) => {
		const addFav = (res) => {
			setFavs(res.data);
		};
		const removeFav = (res) => {
			setFavs(res.data);
			console.log(res);
		};
		if (!favStatus) {
			sendRequest(
				{
					url: `buyer/product/favs`,
					method: "POST",
					body: {
						id: product._id,
					},
				},
				addFav
			);
		} else {
			sendRequest(
				{
					url: `buyer/product/favs`,
					method: "DELETE",
					body: {
						id: product._id,
					},
				},
				removeFav
			);
		}
	};

	const renderProducts = () => {
		const lockup = {};
		for (let fav of favs) {
			lockup[fav._id] = fav._id;
		}
		let list = products.map((prd) => {
			let fav = false;
			if (lockup[prd._id]) fav = true;
			return (
				<div key={prd._id} className={`col-xl-4`}>
					<BuyerProductCard
						handleFavClick={handleFavClick}
						product={prd}
						fav={fav}
					/>
				</div>
			);
		});

		return list;
	};

	return (
		<>
			<div className={`${classes.homeBody} `}>
				<div className={`${classes.container} container my-0`}>
					{products?.length === 0 && <Empty />}
					{products?.length !== 0 && (
						<div
							className={`row justify-content-lg-start justify-content-md-center justify-content-sm-center  `}
						>
							{renderProducts()}
						</div>
					)}
					{products?.length !== 0 && (
						<ReactPaginate
							previousLabel={
								<FontAwesomeIcon icon={faCircleArrowLeft} />
							}
							nextLabel={<FontAwesomeIcon icon={faCircleArrowRight} />}
							breakLabel={"..."}
							pageCount={Math.ceil(totalPages)}
							marginPagesDisplayed={2}
							pageRangeDisplayed={3}
							onPageChange={handelPageClick}
							containerClassName={`${classes.paginationContainer} pagination pb-3 justify-content-center`}
							pageClassName={"page-item px-2 py-1"}
							pageLinkClassName={`page-link ${classes.pageLink}`}
							previousClassName={`page-item `}
							previousLinkClassName={`page-link ${classes.pageItem}`}
							nextClassName={"page-item"}
							nextLinkClassName={`page-link ${classes.pageItem}`}
							breakClassName={"page-item"}
							breakLinkClassName={"page-link"}
							activeClassName={`${classes.active}`}
						/>
					)}
				</div>
			</div>
		</>
	);
}

export default BuyerHome;

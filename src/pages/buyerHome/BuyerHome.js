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
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
/* function valuetext(value) {
  //console.log(value);
  return `${value}°C`;
} */
function BuyerHome() {
	const { sendRequest, hasError } = useFetch();
	const [products, setProducts] = useState([]);
	const [totalPages, setTotalPages] = useState("");
	const [page, setPage] = useState(1);
	const [allCategory, setAllCategory] = useState();
	const [categoryId, setCategory] = useState();
	const loggedAs = useSelector((state) => state.auth.userType);
	const [favs, setFavs] = useState([]);
	const navigate = useNavigate();
	// useEffect(() => {
	// 	function getAllProduct(res) {
	// 		console.log(res?.data.docs);
	// 		setProducts(res?.data.docs);
	// 		setTotalPages(Math.ceil(res?.data.totalPages));
	// 	}
	// 	function getFavs(res) {
	// 		setFavs(res.data);
	// 	}

	// 	sendRequest(
	// 		{
	// 			url: `buyer/product/allProducts`,
	// 			method: "GET",
	// 			params: { page },
	// 		},
	// 		getAllProduct
	// 	);
	// 	sendRequest(
	// 		{
	// 			url: `buyer/product/favs`,
	// 			method: "GET",
	// 		},
	// 		getFavs
	// 	);
	// }, [page, sendRequest]);

	const handleFavClick = (product, favStatus) => {
		const addFav = (res) => {
			setFavs(res.data);
		};
		const removeFav = (res) => {
			setFavs(res.data);
		};
		if (loggedAs === "viewer") {
			navigate("/", { replace: true });
			return;
		}
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
		let list = products?.map((prd) => {
			let fav = false;
			if (lockup[prd._id]) fav = true;
			return (
				<div
					key={prd._id}
					className={`col-xl-4 col-lg-6 col-md-6 col-sm-8 ${classes.colsDesign}`}
				>
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

	const rateArr = [4.5, 4.0, 3.5, 3.0, 2.5];
	const [priceValue, setPriceValue] = useState([0, 100]);
	const [debouncedValue, setDebouncedValue] = useState(priceValue);
	const [rateValue, setRateValue] = useState(0);
	//const [favs, setFavs] = useState([]);
	////********************************OFF CANVAS******************************************////
	const [toggleCanvas, setToggleCanvas] = useState(false);
	const toggleCanvasHandler = () => {
		setToggleCanvas(!toggleCanvas);
	};
	////********************************PAGINITION******************************************////
	const handelPageClick = async (data) => {
		let currentPage = data.selected + 1;
		setPage(currentPage);
	};
	////********************************PRODUCT REQUEST******************************************////

	////********************************FILTER******************************************////
	const handleCategoryChange = (e) => {
		if (e.target.checked) {
			console.log(e.target.checked);
			const target = e.target.value;
			setCategory(target);
			return;
		}
		setCategory();
	};

	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedValue(priceValue);
		}, 1000);

		return () => {
			clearTimeout(timerId);
		};
	}, [priceValue]);

	const handleRatingsChange = (e) => {
		if (e.target.checked) {
			const target = e.target.value;
			setRateValue(target);
			return;
		}
		setRateValue();
	};
	useEffect(() => {
		function getAllCategry(res) {
			if (res.status === 200) {
				setAllCategory(res.data);

				//console.log(allCategory);
			}
		}
		sendRequest(
			{
				url: "buyer/product/getCategory",
				method: "GET",
			},
			getAllCategry
		);
	}, [sendRequest]);
	useEffect(() => {
		function getAllProduct(res) {
			console.log(res?.data.docs);
			setProducts(res?.data.docs);
			setTotalPages(res.data.totalPages);
		}

		function getFavs(res) {
			setFavs(res.data);
		}
		if (loggedAs !== "viewer") {
			sendRequest(
				{
					url: `buyer/product/favs`,
					method: "GET",
				},
				getFavs
			);
		}

		sendRequest(
			{
				url: `buyer/product/allProducts`,
				method: "GET",
				params: {
					page,
					categoryId,
					min: debouncedValue[0],
					max: debouncedValue[1],
					rate: rateValue,
				},
			},
			getAllProduct
		);
	}, [page, sendRequest, categoryId, debouncedValue, rateValue]);

	return (
		<>
			<div className={`${classes.homeBody} `}>
				<div
					className={`  d-flex justify-content-end container mb-2 pt-2 pe-5 `}
				>
					<button
						className="btn mt-2 px-4"
						style={{ backgroundColor: "#091b29", color: "#f8f8f7" }}
						onClick={toggleCanvasHandler}
						type="button"
					>
						<IoFilterOutline
							className="me-3"
							style={{ color: "#f8f8f7", fontSize: "25px" }}
						/>
						Filter
					</button>
				</div>
				<OffCanvas
					className={``}
					toggleCanvas={toggleCanvas}
					toggleCanvasHandler={toggleCanvasHandler}
					placement={"end"}
					name={"Filter Product"}
					title="Filter Product"
				>
					<div className="mt-3">
						<h4 className="title mt-2" style={{ color: "#091b29" }}>
							Category
						</h4>
						<div className="list-group">
							{allCategory?.map((category) => {
								return (
									<label
										className="list-group-item border-0"
										style={{ backgroundColor: "#fff" }}
										key={category._id}
									>
										<input
											key={category._id}
											className="form-check-input me-1"
											//checked={checked}
											onChange={handleCategoryChange}
											type="checkbox"
											value={category._id}
										/>
										{category.name}
									</label>
								);
							})}
						</div>
					</div>
					<div className="mt-3">
						<h4 className="title mt-2" style={{ color: "#091b29" }}>
							Price
						</h4>
						<div className="list-group ">
							<label
								className="list-group-item border-0 "
								style={{ backgroundColor: "#fff" }}
							>
								<Box className="me-1 " sx={{ width: 300 }}>
									<Slider
										// getAriaLabel={() => 'Temperature range'}
										className={`${classes.slider}`}
										value={priceValue}
										onChange={(event, newValue) => {
											setPriceValue(newValue);
										}}
										valueLabelDisplay="auto"
										min={0}
										max={500}
										// color="secondary"
										// getAriaValueText={valuetext}
									/>
								</Box>
							</label>
						</div>
					</div>
					<div className="mt-3">
						<h4 className="title mt-2" style={{ color: "#091b29" }}>
							Ratings
						</h4>
						<div className="list-group ">
							{rateArr?.map((rate) => {
								return (
									<label
										className="list-group-item border-0 "
										style={{ backgroundColor: "#fff" }}
										key={rate._id}
									>
										<input
											key={rate._id}
											className="form-check-input me-1"
											onChange={handleRatingsChange}
											type="checkbox"
											value={rate}
										/>
										{rate.toFixed(1)}&up
										<Rating
											className={`${classes.stars} mx-2  pb-1`}
											transition
											readonly
											ratingValue={rate * 20}
											allowHalfIcon
											size={20}
											fillColorArray={[
												"red",
												"red",
												"red",
												"red",
												"orange",
												"orange",
												"orange",
												"yellow",
												"yellow",
												"yellow",
											]}
										/>
									</label>
								);
							})}
							<div></div>
						</div>
					</div>
				</OffCanvas>
				<div className={`${classes.container} container  my-0`}>
					{(hasError?.error === "Product not found !" ||
						products.length === 0) && <Empty />}
					{!hasError && (
						<div>
							<div
								className={`row justify-content-lg-start justify-content-md-center justify-content-sm-center `}
							>
								{renderProducts()}
							</div>
							<ReactPaginate
								previousLabel={
									<FontAwesomeIcon icon={faCircleArrowLeft} />
								}
								nextLabel={
									<FontAwesomeIcon icon={faCircleArrowRight} />
								}
								breakLabel={"..."}
								pageCount={totalPages}
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
						</div>
					)}
				</div>
			</div>
		</>
	);
}

export default BuyerHome;

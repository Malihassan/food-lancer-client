import classes from "./order-history.module.scss";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import photoTest from "../../../assets/imgs/landing page/cheif.png";
import {
	format,
	formatDistance,
	formatRelative,
	subDays,
	subMonths,
	subWeeks,
} from "date-fns";
import { BiPhoneCall, BiDish } from "react-icons/bi";
import { ImLocation } from "react-icons/im";
import { MdOutlineUpdate } from "react-icons/md";
import { HiIdentification } from "react-icons/hi";
import { BsCalendarDate, BsFillChatQuoteFill } from "react-icons/bs";
import { orderActions } from "../../../store/orderSlice";

import useFetch from "../../../hooks/useFetch";
import OffCanvas from "../../shared/offCanvas/OffCanvas";
import Empty from "../../shared/emptyData/Empty";
import Chat from "../../shared/chat/Chat";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/AuthSlice";
import { Link } from "react-router-dom";
export default function OrderHistory(props) {
	const { sendRequest, hasError } = useFetch();
	const dispatch = useDispatch();
	const [ratingValue, setRatingValue] = useState(0);
	const [isAdded, setIsAdded] = useState(false);
	const [toggleCanvas, setToggleCanvas] = useState(false);
	const [isReviewd, setIsReviewd] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState({});
	const [selectedProductId, setSelectedProductId] = useState("");
	const [reviewForm, setReviewForm] = useState({
		comment: "",
		select: "",
	});
	const [reviewFormErrors, setReviewFormErrors] = useState({
		commentError: null,
		selectError: null,
	});
	const toggleCanvasHandler = (order) => {
		setToggleCanvas(!toggleCanvas);
		if (order) {
			dispatch(
				orderActions.toggleDetailsOrder({
					orderId: order._id,
					buyerId: order.buyerId,
					sellerId: order.sellerId._id,
				})
			);
			sendRequest(
				{
					url: `buyer/chat/setMessgeAsReaded`,
					method: "PATCH",
					body: { orderId: order._id },
				},
				(res) => {
					if (res.status === 200) {
						// setNotifications(res.data);
						dispatch(authActions.setNotification(res.data));
					}
				}
			);
		}
	};
	const handleRating = (rate) => {
		setIsReviewd(false);
		setIsAdded(false);
		setRatingValue(rate);
	};
	const handelFormChange = (ev) => {
		switch (ev.target.id) {
			case "comment":
				{
					setIsReviewd(false);
					setReviewForm({
						...reviewForm,
						comment: ev.target.value,
					});
					setReviewFormErrors({
						...reviewFormErrors,
						commentError:
							ev.target.value.length === 0
								? "This field is required"
								: null,
					});
				}
				break;
			default:
				return "No Match";
		}
	};
	const onChangeHandler = (change) => {
		const options = change.target.options;
		setIsReviewd(false);
		setIsAdded(false);
		for (let index = 0; index < options.length; index++) {
			if (options[index].selected) {
				setSelectedProductId(options[index].id);
			}
		}
	};

	const deliveredOrderHandler = (order) => {
		sendRequest(
			{
				url: `buyer/order/status`,
				method: "PATCH",
				body: { status: "delivered", orderId: order._id },
			},
			(res) => {
				console.log(res);
				let updatedOrders = [...orders];
				updatedOrders.find((order) => {
					if (order._id === res.data._id) {
						order.status = res.data.status;
					}
				});
				setOrder(updatedOrders);
			}
		);
	};
	const paymentOrderHandler = (order) => {
		const paymentResHandler = (res) => {
			console.log(res);
			try {
				window.open(
					res.data.url,
					"targetWindow",
					`toolbar=no,
              location=no,
              status=no,
              menubar=no,
              scrollbars=yes,
              resizable=yes,
              width=500px,
              height=750px`
				);
				if (res.ok) {
					return res.json();
				}
			} catch (e) {
				console.log(e.error);
			}
		};
		sendRequest(
			{
				method: "POST",
				url: `buyer/account/sendToPayment`,
				body: {
					items: order.products,
					orderId: order._id,
				},
			},
			paymentResHandler
		);
	};
	const handelFormSubmit = async (event) => {
		event.preventDefault();
		sendRequest(
			{
				url: `buyer/product/updatedReview/${selectedProductId}`,
				method: "PATCH",
				body: {
					comments: reviewForm.comment,
					rate: ratingValue / 20,
					orderId: selectedOrder._id,
					sellerId: selectedOrder.sellerId._id,
				},
			},
			(res) => {
				if (res.status === 200) {
					setOrder(res.data);
					setIsReviewd(false);
					setIsAdded(true);
				}
			}
		);
	};
	useEffect(() => {
		if (hasError?.error === "this product already have review !") {
			setIsAdded(false);
			setIsReviewd(true);
		}
	}, [hasError]);
	const [orders, setOrder] = useState([]);
	const notifications = useSelector((state) => state.auth.buyerNotification);
	const socket = props.socket;
	useEffect(async () => {
		sendRequest(
			{
				url: `buyer/order/myOrders`,
				method: "GET",
			},
			(res) => {
				if (res.status === 200) {
					const allData = res.data;
					setOrder(allData);
				}
			}
		);
		sendRequest(
			{
				url: `buyer/order/setOrderNotificationAsReaded`,
				method: "GET",
			},
			(res) => {}
		);
	}, []);
	const [update, setUpadate] = useState(false);
	useEffect(() => {
		socket?.on("updateOrderStatus", (data) => {
			let updatedOrders = [...orders];
			updatedOrders.find((order) => {
				if (order._id === data._id) {
					order.status = data.status;
				}
			});
			setOrder(updatedOrders);
			// socket.off("updateOrderStatus");
		});
		socket?.on("receiveNotification", (data) => {
			dispatch(authActions.setNotification(data));
		});
		socket?.on("paymentDone", (data) => {
			let updatedOrders = [...orders];
			updatedOrders.find((order) => {
				if (order._id === data._id) {
					order.status = data.status;
				}
			});
			setOrder(updatedOrders);
			// setOrder(data);
		});
	}, [orders, socket, notifications]);
	return (
		<>
			{orders.length === 0 && <Empty />}
			<OffCanvas
				className={classes.OffCanvas}
				placement={"end"}
				name={"end"}
				title="Chat"
				toggleCanvas={toggleCanvas}
				toggleCanvasHandler={toggleCanvasHandler}
			>
				<div>
					<Chat socket={socket} />
				</div>
			</OffCanvas>
			<div className="row justify-content-center bg-light mx-0">
				{orders.map((order) => {
					return (
						<div
							key={orders.indexOf(order)}
							className={`card mx-0  border  ${classes.cardOrder}`}
						>
							<div className="d-flex flex-md-row flex-column col-12">
								<div
									className={`d-flex flex-column d-md-none d-lg-flex col-lg-4 col-xl-3 col-12 p-3 ps-0 ${classes.divLeftCard}`}
								>
									{order.status === "in progress" && (
										<span
											className={`badge col-4  p-2 rounded-2 bg-primary`}
										>
											{order.status}
										</span>
									)}
									{order.status === "delivered" && (
										<span
											className={`badge col-4  p-2 rounded-2 ${classes.bgSuccess}`}
										>
											{order.status}
										</span>
									)}
									{order.status === "canceled" && (
										<span
											className={`badge col-4  p-2 rounded-2 ${classes.bgDanger}`}
										>
											{order.status}
										</span>
									)}
									{order.status === "pending" && (
										<span
											className={`badge col-4  p-2 rounded-2 ${classes.bgWarning}`}
										>
											{order.status}
										</span>
									)}
									{order.status === "accepted" && (
										<span
											className={`badge col-4  p-2 rounded-2  bg-info text-dark`}
										>
											{order.status}
										</span>
									)}
									<p className="pt-3">
										<HiIdentification className="fs-3 me-3" />{" "}
										{order._id}
									</p>
									<p className="">
										<ImLocation className="fs-3 me-3" />
										{order?.address}
									</p>
									<p className="">
										<BsCalendarDate className="fs-4" />{" "}
										&nbsp;&nbsp;&nbsp;&nbsp;
										{formatDistance(
											subDays(new Date(order.createdAt), 0),
											new Date(),
											{ addSuffix: true }
										)}
									</p>
									<p className="">
										<MdOutlineUpdate className="fs-4" /> &nbsp;
										&nbsp;&nbsp;
										{formatDistance(
											subDays(new Date(order.updatedAt), 0),
											new Date(),
											{ addSuffix: true }
										)}
									</p>
								</div>
								<div
									className={`d-flex flex-column col-xl-6 col-lg-5 col-md-6 col-12 p-3 ${classes.divLeftCard} `}
								>
									<div
										style={{ maxHeight: 159.5, minHeight: 159.5 }}
										className="d-flex flex-column overflow-auto"
									>
										{order.products.map((product) => {
											return (
												<div
													key={order.products.indexOf(product)}
													className="d-flex justify-conten-between"
												>
													<p className="col-9">
														{/* <CgProductHunt  /> */}
														<BiDish
															className={`fs-4 me-1 text-danger ${classes.iconDanger}`}
														/>
														{product.quantity} x{" "}
														{product._id.name}
													</p>
													<p
														className={`col-3 pe-1 fs-4 text-end ${classes.iconDanger}`}
													>
														<span className={`fw-thin `}>
															E&#163;
														</span>{" "}
														{product._id.price}
													</p>
												</div>
											);
										})}
									</div>
									<hr className="opacity-25 fw-light text-secondary" />
									<div className="d-flex justify-conten-between align-items-center">
										<p className="col-8 fs-5 fw-bold mb-0 pb-0">
											Total Price{" "}
											<small
												className={`fw-light ps-2 fs-5 ${classes.iconDanger}`}
											>
												<span className={`fw-thin `}>E&#163;</span>{" "}
												{order.totalPrice}
											</small>
										</p>
										{order.status == "delivered" && (
											<button
												className="col-4 btn btn-primary"
												data-bs-toggle="modal"
												data-bs-target="#exampleModal"
												data-bs-whatever="@mdo"
												onClick={() => {
													setSelectedOrder(order);
												}}
											>
												add review
											</button>
										)}
										{order.status == "in progress" && (
											<button
												className="col-4 btn btn-primary"
												onClick={() => {
													deliveredOrderHandler(order);
												}}
											>
												Delivered ?
											</button>
										)}
										{order.status == "accepted" && (
											<button
												className="col-4 btn btn-primary"
												onClick={() => {
													paymentOrderHandler(order);
												}}
											>
												Payment Order
											</button>
										)}
										<div
											className="modal fade"
											id="exampleModal"
											tabIndex="-1"
											aria-labelledby="exampleModalLabel"
											aria-hidden="true"
										>
											<div className="modal-dialog">
												<div className="modal-content bg-light">
													<div className="modal-header">
														<h5
															className="modal-title text-secondary fw-light"
															id="exampleModalLabel"
														>
															Add Review
														</h5>
														<button
															type="button"
															className="btn-close"
															data-bs-dismiss="modal"
															aria-label="Close"
														></button>
													</div>
													<div className="modal-body">
														<form onSubmit={handelFormSubmit}>
															<div className="mb-3">
																<select
																	id="select"
																	className="form-select form-select-sm"
																	aria-label=".form-select-sm example"
																	onChange={onChangeHandler}
																>
																	<option
																		value=""
																		name="products"
																		aria-describedby="selectHelp"
																	>
																		Select Your Product
																	</option>
																	{selectedOrder?.products?.map(
																		(product, index) => {
																			return (
																				<option
																					key={index}
																					value={
																						product._id
																							.name
																					}
																					id={
																						product._id
																							._id
																					}
																					name="products"
																				>
																					{
																						product._id
																							.name
																					}
																				</option>
																			);
																		}
																	)}
																</select>
																<div
																	id="selectHelp"
																	className="text-danger form-text"
																>
																	{
																		reviewFormErrors.selectError
																	}
																</div>
															</div>

															<div className="mb-3">
																<label
																	htmlFor="comment"
																	className="col-form-label fw-bold fs-5"
																>
																	Review
																</label>
																<textarea
																	id="comment"
																	name="comment"
																	className={`form-control ${
																		reviewFormErrors.commentError
																			? "border-danger"
																			: ""
																	}`}
																	value={reviewForm.comment}
																	aria-describedby="commentHelp"
																	onChange={(e) =>
																		handelFormChange(e)
																	}
																></textarea>
																<div
																	id="commentHelp"
																	className="text-danger form-text"
																>
																	{
																		reviewFormErrors.commentError
																	}
																</div>
															</div>
															<div className="mb-3">
																<label
																	htmlFor="rate"
																	className="form-label fw-bold fs-5"
																>
																	Rate
																</label>
																<br />
																<div className="d-flex justify-content-between">
																	<Rating
																		transition
																		aria-describedby="rateHelp"
																		id="rate"
																		name="rate"
																		onClick={handleRating}
																		ratingValue={ratingValue}
																		allowHalfIcon
																		allowHover
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
																	<p className="pe-2">
																		{ratingValue / 20}
																	</p>
																</div>
																<div
																	id="rateHelp"
																	className="text-danger form-text"
																>
																	{reviewFormErrors.rateError}
																</div>
															</div>
															{isReviewd && (
																<h5 className="text-danger fw-light">
																	This Product has already
																	reviewed
																</h5>
															)}
															{isAdded && (
																<h5 className="text-success fw-light">
																	Added Successfully
																</h5>
															)}
															<div className="modal-footer border-0">
																<button
																	type="button"
																	className="btn btn-secondary"
																	data-bs-dismiss="modal"
																>
																	Close
																</button>
																<button
																	type="submit"
																	disabled={
																		reviewForm.comment ===
																			"" ||
																		ratingValue === 0 ||
																		selectedProductId === ""
																	}
																	className="btn btn-primary"
																>
																	Send Review
																</button>
															</div>
														</form>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div
									className={`d-flex flex-column col-xl-3 col-lg-3 col-md-6 col-12 p-3`}
								>
									<div className="d-flex justify-content-between col-12">
										<p
											className={`fw-light text-secondary opacity-75 fs-5 ${classes.textgray}`}
										>
											Seller Details
										</p>
										{(order.status === "in progress" ||
											order.status === "accepted" ||
											order.status === "pending") && (
											<>
												<div className="position-relative">
													<BsFillChatQuoteFill
														onClick={() =>
															toggleCanvasHandler(order)
														}
														className={`fs-3 m-2 ${classes.chatIcon} `}
													/>
													{notifications.map((notification) => {
														if (
															notification.order.orderId ===
																order._id &&
															notification.chatMessageCount !== 0
														) {
															return (
																<span
																	key={notification._id}
																	className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
																>
																	{
																		notification.chatMessageCount
																	}{" "}
																	+
																</span>
															);
														}
													})}
												</div>
											</>
										)}
									</div>
									<div className="d-flex flex-wrap align-items-center">
										<img
											alt="sellerImage"
											src={order?.sellerId?.image?.url || photoTest}
											className={`img img-fluid rounded-circle ${classes.imgSEller}`}
										/>
										<p className="ps-2 fs-4 ">
											{order.sellerId.firstName[0].toUpperCase() +
												order.sellerId.firstName.slice(1) +
												"  " +
												order.sellerId.lastName[0].toUpperCase() +
												order.sellerId.lastName.slice(1)}
										</p>
									</div>
									<p className="pt-4">
										<BiPhoneCall className="text-primary fs-4 me-2" />
										{order.sellerId.phone}
									</p>
									<div className="d-flex justify-content-between pt-2">
										<p>rate</p>
										<p className="pe-2">
											{order.sellerId.rate.toFixed(1)} / 5{" "}
										</p>
									</div>
									<div className="progress" style={{ height: 9 }}>
										<div
											className="progress-bar"
											role="progressbar"
											
											style={{ width:`${order.sellerId.rate*20}%` }}
										></div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

import classes from "./order-history.module.scss";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import photoTest from "../../../assets/imgs/landing page/cheif.png";
//import { axiosInstance } from "../../../network/axiosConfig";
import { BiPhoneCall, BiDish } from "react-icons/bi";
//import { CgProductHunt } from "react-icons/cg";
import { ImLocation } from "react-icons/im";
import { MdOutlineUpdate } from "react-icons/md";
import { HiIdentification } from "react-icons/hi";
import { BsCalendarDate, BsFillChatQuoteFill } from "react-icons/bs";
import { orderActions } from "../../../store/orderSlice";

import useFetch from "../../../hooks/useFetch";
// import { loadActions } from "../../../store/LoadingSlice";
//import { io } from "socket.io-client";
import OffCanvas from "../../shared/offCanvas/OffCanvas";
import Empty from "../../shared/emptyData/Empty";
import Chat from "../../shared/chat/Chat";
import { useDispatch } from "react-redux";
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
    console.log("in canvas");
    setToggleCanvas(!toggleCanvas);
    if (order)
    {
      dispatch(
        orderActions.toggleDetailsOrder({
          orderId: order._id,
          buyerId:order.buyerId,
          sellerId:order.sellerId._id,
        })
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
              ev.target.value.length === 0 ? "This field is required" : null,
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
          buyerId: selectedOrder.buyerId,
          sellerId: selectedOrder.sellerId._id,
        },
      },
      (res) => {
        if (res.status === 200) {
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
  }, []);
  useEffect(() => {
    socket?.on("updateOrderStatus", (data) => {
      let updatedOrders = [...orders];
      updatedOrders.find((order) => {
        if (order._id === data._id) {
          order.status = data.status;
        }
      });
      setOrder(updatedOrders);
      socket.off("updateOrderStatus");
    });
  }, [orders, socket]);
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
                  className={`d-flex flex-column d-md-none d-lg-flex col-lg-4 col-xl-3 col-12 p-3 ${classes.divLeftCard}`}
                >
                  {order.status === "in progress" && (
                    <span className={`badge col-4  p-2 rounded-2 ${classes.bgWarning}`}>
                      {/* {data.status?data.status:order.status} */}
                      {order.status}
                    </span>
                  )}
                  {order.status === "delivered" && (
                    <span className={`badge col-4  p-2 rounded-2 ${classes.bgSuccess}`}>
                      {order.status}
                      {/* {data.status?data.status:order.status} */}
                    </span>
                  )}
                  {order.status === "canceled" && (
                    <span className={`badge col-4  p-2 rounded-2 ${classes.bgDanger}`}>
                      {order.status}
                      {/* {data.status?data.status:order.status} */}
                    </span>
                  )}
                  {order.status === "pending" && (
                    <span className={`badge col-4  p-2 rounded-2 ${classes.bgWarning}`}>
                      {order.status}
                      {/* {data.status?data.status:order.status} */}
                    </span>
                  )}
                  <p className="pt-3">
                    <HiIdentification className="fs-3 me-3" /> {order._id}
                  </p>
                  <p className="">
                    <ImLocation className="fs-3 me-3" /> Egypt - Faysal
                  </p>
                  <p className="">
                    <BsCalendarDate className="fs-4" /> &nbsp;&nbsp;&nbsp;&nbsp;
                    {new Date(order.createdAt).getHours()} h &nbsp;
                    {new Date(order.createdAt).getMinutes()} m &nbsp;
                  </p>
                  <p className="">
                    <MdOutlineUpdate className="fs-4" /> &nbsp; &nbsp;&nbsp;
                    {new Date(order.updatedAt).getHours()} h &nbsp;
                    {new Date(order.updatedAt).getMinutes()} m &nbsp;
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
                            <BiDish className="fs-4 me-1 text-danger" />
                            {product.quantity} x {product._id.name}
                          </p>
                          <p className="col-3 pe-1 fs-4 text-end ">
                            <span className={`fw-thin ${classes.bgDanger}`}>E&#163;</span>{" "}
                            {product._id.price}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  <hr className="opacity-25 fw-light text-secondary" />
                  <div className="d-flex justify-conten-between">
                    <p className="col-8 fs-4 fw-bold">
                      Total Price{" "}
                      <small className="fw-light ps-2 fs-4">
                        <span className={`fw-thin ${classes.bgDanger}`}>E&#163;</span>{" "}
                        {order.totalPrice}
                      </small>
                    </p>
                    <button
                      className="col-4 btm-sm btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      data-bs-whatever="@mdo"
                      onClick={() => {
                        console.log(order);
                        setSelectedOrder(order);
                      }}
                    >
                      add review
                    </button>
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
                                {/* <label
                                htmlFor="select"
                                className="col-form-label fw-bold fs-5"
                              >
                                Select Product
                              </label> */}
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

                                  {order.products.map((product) => {
                                    return (
                                      <option
                                        key={order.products.indexOf(product)}
                                        value={product._id.name}
                                        id={product._id._id}
                                        name="products"
                                      >
                                        {product._id.name}
                                      </option>
                                    );
                                  })}
                                </select>
                                <div
                                  id="selectHelp"
                                  className="text-danger form-text"
                                >
                                  {reviewFormErrors.selectError}
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
                                  onChange={(e) => handelFormChange(e)}
                                ></textarea>
                                <div
                                  id="commentHelp"
                                  className="text-danger form-text"
                                >
                                  {reviewFormErrors.commentError}
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
                                  <p className="pe-2">{ratingValue / 20}</p>
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
                                  this product already commented by your
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
                                    reviewForm.comment === "" ||
                                    ratingValue === 0 ||
                                    selectedProductId === ""
                                  }
                                  className="btn btn-primary"
                                >
                                  Send review
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
                    <p className={`fw-light text-secondary opacity-75 fs-5 ${classes.textgray}`}>
                      Seller Details
                    </p>
                    { (order.status==="in progress" || order.status==="pending")&&
                    <BsFillChatQuoteFill
                      onClick={()=>toggleCanvasHandler(order)}
                      className={`fs-3 ${classes.chatIcon}`}
                    />
        }
                  </div>
                  <div className="d-flex flex-wrap align-items-center">
                    <img
                    alt="sellerImage"
                      src={photoTest}
                      className={`img img-fluid rounded-circle ${classes.imgSEller}`}
                    />
                    <p className="ps-2 fs-4 ">
                      {order.sellerId.firstName +
                        "  " +
                        order.sellerId.lastName}
                    </p>
                    {/* <p>{seller.firstName[0].toUpperCase()+seller.firstName.slice(1) + '  '+ seller.lastName[0].toUpperCase()+seller.lastName.slice(1)}</p> */}
                  </div>
                  <p className="pt-4">
                    <BiPhoneCall className="text-primary fs-4 me-2" />
                    {order.sellerId.phone}
                  </p>
                  <div className="d-flex justify-content-between pt-2">
                    <p>rate</p>
                    <p className="pe-2">{order.sellerId.rate * 10}% </p>
                  </div>
                  <div className="progress" style={{ height: 9 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: 39.2 * order.sellerId.rate }}
                    >
                      {/* {seller.rate*10}%  */}
                    </div>
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

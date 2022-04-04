import classes from "./order-history.module.scss";
import React, { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import photoTest from "../../../assets/imgs/landing page/cheif.png";
import { axiosInstance } from "../../../network/axiosConfig";
import { BiPhoneCall } from "react-icons/bi";
import { CgProductHunt } from "react-icons/cg";
import { ImLocation } from "react-icons/im";
import { MdOutlineUpdate } from "react-icons/md";
import { HiIdentification } from "react-icons/hi";
import { BsCalendarDate } from "react-icons/bs";
export default function OrderHistory() {
  const [ratingValue, setRatingValue] = useState(0);
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
  const handleRating = (rate) => {
    setIsReviewd(false);
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
      case "select":
        {
          setReviewFormErrors({
            ...reviewFormErrors,
            selectError:
              selectedProductId == "select" ? "this field is required" : null,
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
    for (let index = 0; index < options.length; index++) {
      if (options[index].selected) {
        setSelectedProductId(options[index].id);
      }
    }
  };
  const handelFormSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedOrder, "order");
    console.log(selectedOrder.buyerId, "buyerId");
    console.log(selectedOrder.sellerId._id, "sellerId");
    console.log(reviewForm.comment, "comment");
    console.log(ratingValue / 20, "rate");
    console.log(selectedProductId, "productId");
    try {
      const update = await axiosInstance.patch(
        `buyer/product/updatedReview/${selectedProductId}`,
        {
          comments: reviewForm.comment,
          rate: ratingValue / 20,
          orderId: selectedOrder._id,
          buyerId: selectedOrder.buyerId,
          sellerId: selectedOrder.sellerId._id,
        }
      );
      console.log(update, "updated");
    } catch (err) {
      if (err.message == "Request failed with status code 304") {
        setIsReviewd(true);
      }
    }
  };
  const [orders, setOrder] = useState([]);
  useEffect(async () => {
    const allData = await axiosInstance.get(
      `buyer/order/620c1e0a2cad1441278d57f9`
    );
    setOrder(allData.data);
  }, []);
  return (
    <div className="row justify-content-center bg-light mx-0">
      {orders.map((order) => {
        return (
          <div
            key={orders.indexOf(order)}
            className={`card mx-0  border w-75  ${classes.cardOrder}`}
          >
            <div className="d-flex flex-md-row flex-column col-12">
              <div
                className={`d-flex flex-column d-md-none d-lg-flex col-lg-4 col-12 p-3 ${classes.divLeftCard}`}
              >
                {order.status == "in progress" && (
                  <span className="badge col-4 col-xl-3 p-2 rounded-2 bg-warning">
                    {order.status}
                  </span>
                )}
                {order.status == "delivered" && (
                  <span className="badge col-3 p-2 rounded-2 bg-success">
                    {order.status}
                  </span>
                )}
                {order.status == "canceled" && (
                  <span className="badge col-3 p-2 rounded-2 bg-danger">
                    {order.status}
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
                className={`d-flex flex-column col-lg-4 col-md-6 col-12 p-3 ${classes.divLeftCard} `}
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
                          <CgProductHunt className="fs-4 me-1 text-danger" />
                          {product.quantity} x {product._id.name}
                        </p>
                        <p className="col-3 pe-1 text-end ">
                          EGP {product._id.price}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <hr className="opacity-25 fw-light text-secondary" />
                <div className="d-flex justify-conten-between">
                  <p className="col-8 fs-4 fw-bold">
                    Total Price{" "}
                    <small className="fw-light ps-2 fs-5">
                      EGP {order.totalPrice}
                    </small>
                  </p>
                  {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button> */}
                  <button
                    // style={{ height: 40 }}
                    className="col-4 btm-sm btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    data-bs-whatever="@mdo"
                    onClick={()=>{console.log(order); setSelectedOrder(order)}}
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
                          <h5 className="modal-title text-secondary fw-light" id="exampleModalLabel">
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
                          <form
                            onSubmit={handelFormSubmit}
                          >
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
                                  reviewForm.comment == "" || ratingValue == 0 || selectedProductId==""
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
                className={`d-flex flex-column  col-lg-4 col-md-6 col-12 p-3`}
              >
                <p className="fw-light text-secondary opacity-75 fs-5">
                  Seller Details
                </p>
                <div className="d-flex flex-wrap align-items-center">
                  <img
                    src={photoTest}
                    className={`img img-fluid rounded-circle ${classes.imgSEller}`}
                  />
                  <p className="ps-2 fs-4 ">
                    {order.sellerId.firstName + "  " + order.sellerId.lastName}
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

    // <div className={`card  border w-75  ${classes.cardOrder}`}>
    // <div className="d-flex">
    //   <div
    //     className={`d-flex flex-column col-4 p-3 ${classes.divLeftCard}`}
    //   >
    //     <span className="badge col-3 p-2 rounded-2 bg-warning">
    //       {order.status}
    //     </span>
    //     <p className="pt-3">ID : {order._id}</p>
    //     <p className="">
    //       Date :
    //       {new Date(order.createdAt).toLocaleDateString(undefined, {
    //         weekday: "long",
    //         year: "numeric",
    //         month: "long",
    //         day: "numeric",
    //       })}
    //     </p>
    //   </div>
    //   <div
    //     className={`d-flex flex-column col-4 p-3 ${classes.divLeftCard}`}
    //   >
    //     <div className="d-flex flex-column">
    //       {products.map((product) => {
    //         return (
    //           <div
    //             key={products.indexOf(product)}
    //             className="d-flex justify-conten-between"
    //           >
    //             <p className="col-10">
    //               {product.quantity} x {product._id.name}
    //             </p>
    //             <p className="col-2 text-end ">EGP {product._id.price}</p>
    //           </div>
    //         );
    //       })}
    //     </div>
    //     <hr className="opacity-25 fw-light text-secondary" />
    //     <div className="d-flex justify-conten-between">
    //       <p className="col-8 fs-4 fw-bold">
    //         Total Price{" "}
    //         <small className="fw-light ps-2 fs-5">
    //           EGP {order.totalPrice}
    //         </small>
    //       </p>
    //       {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button> */}
    //       <button
    //         style={{ height: 40 }}
    //         className="col-4 btm-sm btn btn-primary"
    //         data-bs-toggle="modal"
    //         data-bs-target="#exampleModal" data-bs-whatever="@mdo"
    //       >
    //         add review
    //       </button>
    //       <div
    //         class="modal fade"
    //         id="exampleModal"
    //         tabindex="-1"
    //         aria-labelledby="exampleModalLabel"
    //         aria-hidden="true"
    //       >
    //         <div class="modal-dialog">
    //           <div class="modal-content">
    //             <div class="modal-header">
    //               <h5 class="modal-title" id="exampleModalLabel">
    //                 Add Review
    //               </h5>
    //               <button
    //                 type="button"
    //                 class="btn-close"
    //                 data-bs-dismiss="modal"
    //                 aria-label="Close"
    //               ></button>
    //             </div>
    //             <div class="modal-body">
    //               <form>
    //                 <div class="mb-3">
    //                   <label for="message-text" class="col-form-label">
    //                     Review :
    //                   </label>
    //                   <textarea
    //                     class="form-control"
    //                     id="message-text"
    //                   ></textarea>
    //                 </div>
    //               </form>
    //             </div>
    //             <div class="modal-footer">
    //               <button
    //                 type="button"
    //                 class="btn btn-secondary"
    //                 data-bs-dismiss="modal"
    //               >
    //                 Close
    //               </button>
    //               <button type="button" class="btn btn-primary">
    //                 Send review
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className={`d-flex flex-column col-4 p-3`}>
    //     <p className="fw-light text-secondary opacity-75 fs-5">
    //       Seller Details
    //     </p>
    //     <div className="d-flex flex-wrap align-items-center">
    //       <img
    //         src={photoTest}
    //         className={`img img-fluid rounded-circle ${classes.imgSEller}`}
    //       />
    //       <p className="ps-2 fs-4 ">
    //         {seller.firstName + "  " + seller.lastName}
    //       </p>
    //       {/* <p>{seller.firstName[0].toUpperCase()+seller.firstName.slice(1) + '  '+ seller.lastName[0].toUpperCase()+seller.lastName.slice(1)}</p> */}
    //     </div>
    //     <p className="pt-3">phone : {seller.phone}</p>
    //     <div className="d-flex justify-content-between">
    //       <p>rate</p>
    //       <p className="pe-2">{seller.rate * 10}% </p>
    //     </div>
    //     <div className="progress" style={{ height: 9 }}>
    //       <div
    //         className="progress-bar"
    //         role="progressbar"
    //         style={{ width: 39.2 * seller.rate }}
    //       >
    //         {/* {seller.rate*10}%  */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // </div>

    // <div className="card p-3">
    //   <div className="d-flex justify-content-center">
    //   <div className="d-flex bg-light py-4 px-3 w-75">
    //     <h4 className="col-6 ">#orderID :- 9x3983008429019381389</h4>
    //     <h5 className="col-6 text-end ">
    //       {" "}
    //       {new Date().toLocaleDateString(undefined, {
    //         weekday: "long",
    //         year: "numeric",
    //         month: "long",
    //         day: "numeric",
    //       })}
    // </h5>
    //   </div
    //   >
    //   </div>
    //   <div className="d-flex flex-column align-items-center">
    //     <div className={`row flex-wrap py-2 justify-content-around w-75 `}>
    //       <div className="d-flex justify-content-center align-items-center  col-3">
    //         <div className="p-4"  style={{height:200,width:200}}>
    //         <img src={photoTest} className={`round-img img-fluid w-100 h-100`}/>
    //         </div>
    //       </div>
    //       <div className="col-9 d-flex pe-0 flex-column p-5 justify-content-center">
    //         <h4 >Marshrom Pizza Medium</h4>
    //         <p className="card-text text-secondary fs-5">
    //           lorem description description description description description
    //           description description description description description
    //           description description description description description
    //           description description description description description
    //         </p>

    //         <div className="d-flex justify-content-between">
    //           <h5 className="fw-light">EGP 50 X 2</h5>
    //         </div>
    //         <hr />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

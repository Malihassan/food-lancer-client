import "./product-edit-panel.scss";
import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen,faTrash } from "@fortawesome/free-solid-svg-icons";
import { productActions } from "../../../store/ProductSlice";

import { axiosInstance } from "../../../network/axiosConfig";

function ProductEditPanel(props) {
	const dispatch = useDispatch();
	const { data } = props;
	const [rating, setRating] = useState(0);
	const [editForm, setEditForm] = useState({
		nameField: "",
		priceField: 0,
		descriptionField: "",
		imagesField: [],
	});
	const deleteProduct = async () => {
		const res = await axiosInstance.delete(`seller/product/${data._id}`);
		dispatch(productActions.deleted());
		window.history.back();
	  };
	const [editFormErr, setEditFormErr] = useState({
		nameFieldErr: "",
		priceFieldErr: "",
		descriptionFieldErr: "",
		imagesFieldErr: "",
	});

	useEffect(() => {
		setRating(data.avgRate);
		setEditForm({
			nameField: data.name || "",
			priceField: data.price || 0,
			descriptionField: data.description || "",
			imagesField: data.image || [],
		});
	}, [data]);

	useEffect(() => {
		console.log(editForm);
		console.log(editFormErr.imagesFieldErr);
	}, [editForm]);

	const formHandler = async (e) => {
		let pattern;

		switch (e.target.name) {
			case "nameField":
				setEditForm({ ...editForm, nameField: e.target.value });
				setEditFormErr({
					...editFormErr,
					nameFieldErr: !e.target.value.length
						? "This field is required..."
						: null,
				});

				break;
			case "priceField":
				pattern = /^\d+$/;

				setEditForm({ ...editForm, priceField: e.target.value });
				setEditFormErr({
					...editFormErr,
					priceFieldErr: !e.target.value.length
						? "This field is required..."
						: pattern.test(e.target.value)
						? null
						: "Enter a valid price",
				});
				break;
			case "descriptionField":
				setEditForm({ ...editForm, descriptionField: e.target.value });
				setEditFormErr({
					...editFormErr,
					descriptionFieldErr: !e.target.value.length
						? "This field is required..."
						: null,
				});

				break;
			default:
				return;
		}
	};

	const imageHandler = (files) => {
		console.log(files[0], "file");
		setEditForm({ ...editForm, imagesField: [...files] });
		setEditFormErr({
			...editFormErr,
			imagesFieldErr: !files.length
				? "This field is required..."
				: files.length > 5
				? "You exceeded the maximum number of images"
				: null,
		});

		[...files].forEach((file) => {
			setEditFormErr({
				...editFormErr,
				imagesFieldErr: !/\.(jpe?g|png|gif|jfif)$/i.test(file.name)
					? "Enter a valid image"
					: file.size > 1000000
					? "You exceeded the maximum allowed size"
					: null,
			});
		});
	};

	const editDetails = async (e) => {
		e.preventDefault();
		console.log(editForm.imagesField);

		let formData = new FormData();
		Array.from(editForm.imagesField).forEach((file) =>
			formData.append("image", file)
		);
		formData.append("name", editForm.nameField);
		formData.append("price", editForm.priceField);
		formData.append("description", editForm.descriptionField);

		await (async () => {
			console.log("RESULT");
			const res = await axiosInstance.patch(
				`seller/product/${data._id}`,
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);
			console.log(res, "RESULT");
		})();

		window.location.reload();
	};

	return (
		<>
			<div className="row flex-xl-row flex-column justify-content-between text-dark p-2">
				{/* <div className="d-flex justify-content-end">
                    <button type="button" class="btn btn-dark rounded-circle" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                </div> */}

				<div
					class="modal fade"
					id="staticBackdrop"
					data-bs-backdrop="static"
					data-bs-keyboard="false"
					tabindex="-1"
					aria-labelledby="staticBackdropLabel"
					aria-hidden="true"
				>
					<div class="modal-dialog">
						<div class="modal-content">
							<div class="modal-header">
								<h5 class="modal-title" id="staticBackdropLabel">
									Edit Product Details
								</h5>
								<button
									type="button"
									class="btn-close"
									data-bs-dismiss="modal"
									aria-label="Close"
								></button>
							</div>
							<div class="modal-body">
								<form id="editForm" onSubmit={editDetails}>
									<div className="my-4">
										<label
											htmlFor="exampleInputEmail1"
											className="form-label text-start"
										>
											Product Name
										</label>
										<input
											type="text"
											name="nameField"
											onChange={(e) => formHandler(e)}
											value={editForm.nameField}
											className="form-control"
											id="exampleInputEmail1"
											aria-describedby="emailHelp"
											required
										/>
										<div className="text-danger">
											<small>{editFormErr.nameFieldErr}</small>
										</div>
									</div>
									<div className="my-4">
										<label
											htmlFor="exampleInputPassword1"
											className="form-label text-start"
										>
											Price
										</label>
										<input
											type="text"
											name="priceField"
											onChange={(e) => formHandler(e)}
											value={editForm.priceField}
											className="form-control"
											id="exampleInputPassword1"
											required
										/>
										<div className="text-danger">
											<small>{editFormErr.priceFieldErr}</small>
										</div>
									</div>
									<div className="my-4">
										<label
											htmlFor="exampleInputPassword1"
											className="form-label text-start"
										>
											Description
										</label>
										<input
											type="text"
											name="descriptionField"
											onChange={(e) => formHandler(e)}
											value={editForm.descriptionField}
											className="form-control"
											id="exampleInputPassword1"
											required
										/>
										<div className="text-danger">
											<small>
												{editFormErr.descriptionFieldErr}
											</small>
										</div>
									</div>
									<div className="my-4">
										<label
											htmlFor="exampleInputPassword1"
											className="form-label text-start"
										>
											Images
										</label>
										<input
											type="file"
											name="imagesField"
											onChange={(e) => imageHandler(e.target.files)}
											className="form-control"
											id="exampleInputPassword1"
											required
											multiple
										/>
										<div className="text-danger">
											<small>{editFormErr.imagesFieldErr}</small>
										</div>
									</div>
								</form>
							</div>
							<div class="modal-footer">
								<button
									type="button"
									class="btn btn-secondary"
									data-bs-dismiss="modal"
								>
									Close
								</button>
								<button
									type="submit"
									form="editForm"
									disabled={
										editFormErr.nameFieldErr ||
										editFormErr.priceFieldErr ||
										editFormErr.imagesFieldErr ||
										editFormErr.descriptionFieldErr
									}
									class="btn btn-dark"
								>
									Update
								</button>
							</div>
						</div>
					</div>
				</div>
				<div
					id="carouselExampleIndicators"
					className="carousel slide col-xl-6 col-12 pt-xl-2"
					data-bs-ride="carousel"
				>
					<div className="carousel-indicators">
						{data?.image?.map((image, index) => {
							return (
								<button
									type="button"
									data-bs-target="#carouselExampleIndicators"
									data-bs-slide-to="0"
									className={`${index === 0 ? "active" : ""}`}
									aria-current={`${index === 0 ? "true" : ""}`}
									aria-label={`Slide ${index + 1}`}
								></button>
							);
						})}
					</div>
					<div className="carousel-inner">
						{data?.image?.map((image, index) => {
							return (
								<div
									className={`carousel-item ${
										index === 0 ? "active" : ""
									}`}
									key={index}
								>
									<img
										src={image.url}
										className="d-block w-100 carousel-h"
										alt="..."
									/>
								</div>
							);
						})}
					</div>
					<button
						className="carousel-control-prev"
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide="prev"
					>
						<span
							className="carousel-control-prev-icon"
							aria-hidden="true"
						></span>
						<span className="visually-hidden">Previous</span>
					</button>
					<button
						className="carousel-control-next"
						type="button"
						data-bs-target="#carouselExampleIndicators"
						data-bs-slide="next"
					>
						<span
							className="carousel-control-next-icon"
							aria-hidden="true"
						></span>
						<span className="visually-hidden">Next</span>
					</button>
				</div>
				<div className="col-xl-6 col-12 mt-4 mt-xl-0">
					<div className="d-flex justify-content-end ">
					<button
							type="button"
							class="btn btn-dark rounded-circle me-3"
							onClick={() => {
								deleteProduct();
							  }}
						>
							<FontAwesomeIcon icon={faTrash} />
						</button>
						<button
							type="button"
							class="btn btn-dark rounded-circle"
							data-bs-toggle="modal"
							data-bs-target="#staticBackdrop"
						>
							<FontAwesomeIcon icon={faPen} />
						</button>
					</div>
					<p className="display-5">{data.name}</p>
					<div className="d-flex">
						<StarRatings
							starDimension="1rem"
							starSpacing="0.05rem"
							rating={rating}
							starRatedColor="orange"
						/>
						<p className="m-1 ms-2">{rating || 0} / 5</p>
					</div>
					<div className="mt-3">
						<p>Seller: {data.sellerId?.userName}</p>
						<p>{data.price} EGP</p>
						<p>Category: {data.categoryId?.name}</p>
					</div>
					<div className="my-5">
						<h5>
							<span
								class={`badge ${
									data.status === "pending"
										? "bg-warning"
										: data.status === "active"
										? "bg-success"
										: "bg-danger"
								}`}
							>
								{data.status}
							</span>
						</h5>
					</div>
					{/* <div className={`col-12 d-flex justify-content-center align-self-bottom pt-2`}>
                        <button className='btn shadow maroon text-light text-font w-100 me-1' data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit <FontAwesomeIcon icon={faPen} /></button>
                    </div> */}
				</div>
			</div>
		</>
	);
}

export default ProductEditPanel;
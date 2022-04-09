import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classes from "./buyerProfile.module.scss";
import { axiosInstance } from "../../network/axiosConfig";
import { RiFolderOpenFill } from "react-icons/ri";
import Dropzone from "react-dropzone";
// import { useDropzone } from "react-dropzone";

let initialValues = {
	firstName: "",
	lastName: "",
	phone: "",
	address: "",
	image: "",
};

function BuyerProfile() {
	const [update, setUpdate] = useState(false);
	const [updateRes, setUpdateRes] = useState("");
	const [images, setImages] = useState({ image: "" });

	const validate = (values) => {
		let errors = {};

		if (values.firstName.length < 3 || values.firstName.length > 20) {
			errors.firstName = "Name length must be between 3 and 20";
		}

		if (values.lastName.length < 3 || values.lastName.length > 20) {
			errors.lastName = "Name length must be between 3 and 20";
		}

		if (
			!values?.phone.toString().match(/^01[0125]\d{1,8}/g) ||
			values?.phone.length !== 11
		) {
			errors.phone = "Please enter a correct valid phone number";
		}
		return errors;
	};

	const onSubmit = (values) => {
		let formData = new FormData();
		const newImg = { _id: "", url: "" };
		newImg._id = images._id;
		newImg.url = images.url;
		formData.append("image", images.image);
		formData.append("newImg", newImg._id);
		formData.append("firstName", values.firstName);
		formData.append("lastName", values.lastName);
		formData.append("phone", values.phone);
		formData.append("address", values.address);
		formData.append("imageId", images._id);
		formData.append("imageUrl", images.url);

		(async () => {
			const res = await axiosInstance.patch(
				`buyer/account/update`,
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);
			setUpdateRes(res.data);
			setUpdate(!update);
		})();
	};

	const uploadImage = (files) => {
		const formData = new FormData();
		formData.append("file", files[0]);

		const temp = files[0];
		setImages({ ...images, image: temp });
	};

	useEffect(() => {
		const fillData = async () => {
			const { data } = await axiosInstance.get(`buyer/account/info`);

			setImages(data?.image);

			initialValues.image = data?.image?.url;
			initialValues.firstName = data?.firstName;
			initialValues.lastName = data?.lastName;
			initialValues.phone = data?.phone;
			initialValues.address = data?.address;
			setUpdate(!update);
		};
		fillData();
	}, []);

	return (
		
			<div className={`${classes.backColor} py-3 container-fluid`}>
				<div
				 className= {`col-lg-7 shadow mx-auto container-fluid ${classes.backColors} col-md-10 ${classes.borderLeft} d-flex flex-column `}
				/* 	style={{ height: "auto", width: "60vw" }} */
				>
				
						<div
							className="fs-1 mt-2 ms-1 text-center"
							style={{
								fontFamily: " 'El Messiri', sans-serif",
							}}
						>
							Update Information
							<br />
							<img
								src={images?.url}
								alt=".."
								style={{
									width: "100px",
									height: "100px",
									borderRadius: "50%",
								}}
							/>
						</div>

						<hr className="mb-2" />
						<Formik
							initialValues={initialValues}
							validate={validate}
							onSubmit={onSubmit}
						>
							<Form>
								<Field
								 className={`form-control mt-4 ${classes.inputWidth}`}
									id="firstName"
									name="firstName"
									placeholder="First Name"
								/>
								<div className={`my-1 fw-light ${classes.textWarning} text-center`}>
									<ErrorMessage name="firstName" />
								</div>
								<Field
									id="lastName"
									name="lastName"
                  className={`form-control mt-4 ${classes.inputWidth}`}
									placeholder="Last Name"
								/>
								<div className={`my-1 fw-light ${classes.textWarning} text-center`}>
									<ErrorMessage name="lastName" />
								</div>
								<Field
									id="phone"
									name="phone"
                  className={`form-control mt-4 ${classes.inputWidth}`}
									placeholder="Phone Number"
									type="text"
								/>
								<div className={`my-1 fw-light ${classes.textWarning} text-center`}>
									<ErrorMessage name="phone" />
								</div>
								<Field
									id="address"
									name="address"
                  className={`form-control mt-4 ${classes.inputWidth}`}
									placeholder="Your Address"
									type="text"
								/>
								<div className={`my-1 fw-light ${classes.textWarning} text-center`}>
									<ErrorMessage name="address" />
								</div>

								<p className="text-center h5 pt-3">
									Image Upload
									<small className={`${classes.textMuted}`}>(optional)</small>
								</p>
								<hr className="mb-4" />
								<div className={`${classes.dropZone}`}>
									<Dropzone
										name="image"
										id="image"
										accept="image/*"
										onDrop={(e) => {
											uploadImage(e);
										}}
									>
										{({ getRootProps, getInputProps }) => (
											<section>
												<div {...getRootProps()}>
													<input
														{...getInputProps()}
														onChange={(e) => {
															uploadImage(e.target.files);
														}}
													/>
													<RiFolderOpenFill  className={`my-1 fw-light ${classes.textWarning} text-center`} />
													<p>Drag & Drop Files Here</p>
													<div className="row col-12 text-start ps-5"></div>
												</div>
											</section>
										)}
									</Dropzone>
								</div>

								<div className={`my-1 fw-light ${classes.textWarning} text-center`}>
									<ErrorMessage name="image" />
								</div>
                <div className="d-flex justify-content-center mt-4 mb-4">
								<button
									type="submit"
									style={{ height: "3rem" }}
									className={`btn ${classes.btnSubmit} px-4 `}
								>
									Submit
								</button>
                </div>
								<div
									className="fs-3 mt-5  ms-1 "
									style={{
										fontFamily: " 'El Messiri', sans-serif",
									}}
								>
									{updateRes}
								</div>
							</Form>
						</Formik>
					</div>
			
			</div>
	
	);
}

export default BuyerProfile;

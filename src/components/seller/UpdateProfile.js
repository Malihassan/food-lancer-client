import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classes from "./updateProfile.module.css";
import { RiFolderOpenFill } from "react-icons/ri";
import Dropzone from "react-dropzone";
import useFetch from "../../hooks/useFetch";
import img from "../../assets/imgs/landing page/cheif.png";

let initialValues = {
	firstName: "",
	lastName: "",
	phone: "",
	coverageArea: "0",
	image: "",
};

function UpdateProfile() {
	const [update, setUpdate] = useState(false);
	const [areas, setAreas] = useState([]);
	const [updateRes, setUpdateRes] = useState("");
	const [images, setImages] = useState({ image: "" });
	const { sendRequest } = useFetch();

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
		formData.append("image", images.image);
		formData.append("firstName", values.firstName);
		formData.append("lastName", values.lastName);
		formData.append("phone", values.phone);
		formData.append("coverageArea", values.coverageArea);
		formData.append("imageId", images._id);
		formData.append("imageUrl", images.url);

		function updateSellerProfilehandler(res) {
			if (res.status === 200) {
				setUpdateRes(res.data);
				setUpdate(!update);
			}
		}
		(async () => {
			sendRequest(
				{
					url: `seller/account/editProfile`,
					method: "PATCH",
					body: formData,
					headers: {
						"Content-Type": "multipart/form-data",
					},
				},
				updateSellerProfilehandler
			);
		})();
	};

	const uploadImage = (files) => {
		const formData = new FormData();
		formData.append("file", files[0]);

		const temp = files[0];
		setImages({ ...images, image: temp });
	};

	useEffect(() => {
		function getCoverageAreaHandler(res) {
			if (res.status === 200) setAreas(res.data);
		}
		function getSellerInfoHandler(res) {
			if (res.status === 200) {
				const { data } = res;
				setImages(data.seller.image);

				initialValues.image = data.seller.image?.url;
				initialValues.firstName = data.seller?.firstName;
				initialValues.lastName = data.seller?.lastName;
				initialValues.phone = data.seller?.phone;
				initialValues.coverageArea = data.seller?.coverageArea?._id;
				setUpdate(!update);
			}
		}

		const fillData = async () => {
			sendRequest(
				{ url: `seller/account/coverageArea`, method: "GET" },
				getCoverageAreaHandler
			);
			sendRequest(
				{ url: `seller/account/info`, method: "GET" },
				getSellerInfoHandler
			);
		};
		fillData();
	}, []);

	return (
		<div className={`${classes.backColor} py-3 container-fluid`}>
			<div
				className={`col-lg-7 shadow mx-auto container-fluid ${classes.backColors} col-md-10 ${classes.borderLeft} d-flex flex-column `}
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
						src={images?.url || img}
						alt=".."
						style={{
							width: "130px",
							height: "130px",
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
						<div
							className={`my-1 fw-light ${classes.textWarning} text-center`}
						>
							<ErrorMessage name="firstName" />
						</div>
						<Field
							id="lastName"
							name="lastName"
							className={`form-control mt-4 ${classes.inputWidth}`}
							placeholder="Last Name"
						/>
						<div
							className={`my-1 fw-light ${classes.textWarning} text-center`}
						>
							<ErrorMessage name="lastName" />
						</div>
						<Field
							id="phone"
							name="phone"
							className={`form-control mt-4  ${classes.inputWidth}`}
							placeholder="Phone Number"
							type="text"
						/>
						<div
							className={`my-1 fw-light ${classes.textWarning} text-center`}
						>
							<ErrorMessage name="phone" />
						</div>
						<Field
							as="select"
							name="coverageArea"
							className={`form-select mt-4  ${classes.inputWidth}`}
							aria-label="Default select example"
						>
							<option className={`${classes.option}`} value="0">
								Select Coverage Area
							</option>
							{areas.map((area) => (
								<option
									className={`${classes.option}`}
									key={area?._id}
									value={area?._id}
								>
									{area?.governorateName} - {area?.regionName}
								</option>
							))}
						</Field>
						<p className="text-center h5 pt-3">
							Image Upload
							<small className={`${classes.textMuted}`}>
								(optional)
							</small>
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
											<RiFolderOpenFill
												className={`my-1 fw-light ${classes.textWarning} text-center`}
											/>
											<p>Drag & Drop Files Here</p>
											<div className="row col-12 text-start ps-5"></div>
										</div>
									</section>
								)}
							</Dropzone>
						</div>

						<div
							className={`my-1 fw-light ${classes.textWarning} text-center`}
						>
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
							className="fs-3 mt-5 ms-1 "
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

export default UpdateProfile;

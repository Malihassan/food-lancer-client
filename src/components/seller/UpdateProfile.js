import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classes from "./updateProfile.module.css";
import { axiosInstance } from "../../network/axiosConfig";
import { RiFolderOpenFill } from "react-icons/ri";
import Dropzone from "react-dropzone";
// import { useDropzone } from "react-dropzone";

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
	const [image, setImage] = useState({ image: "" });

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
		formData.append("image", image.image);
		formData.append("firstName", values.firstName);
		formData.append("lastName", values.lastName);
		formData.append("phone", values.phone);
		formData.append("coverageArea", values.coverageArea);
		formData.append("imageId", image._id);

		(async () => {
			const res = await axiosInstance.patch(
				`seller/account/editProfile`,
				formData,
				{ headers: { "Content-Type": "multipart/form-data" } }
			);
			setUpdateRes(res.data);
		})();
	};

	const uploadImage = (files) => {
		const formData = new FormData();
		formData.append("file", files[0]);

		const temp = files[0];
		setImage({ ...image, image: temp });
	};

	useEffect(() => {
		const fillData = async () => {
			const res = await axiosInstance.get(`seller/account/coverageArea`);

			const resAreas = res.data;
			setAreas(resAreas);
			const { data } = await axiosInstance.get(`seller/account/info`);

			setImage(data.seller.image);

			initialValues.image = data.seller.image?.url;
			initialValues.firstName = data.seller?.firstName;
			initialValues.lastName = data.seller?.lastName;
			initialValues.phone = data.seller?.phone;
			initialValues.coverageArea = data.seller?.coverageArea?._id;
			setUpdate(!update);
		};
		fillData();
	}, [update]);

	return (
		<>
			<div className={`${classes.backColor} mb-5 container-fluid`}>
				<div
					className={`container shadow-lg p-0  row mt-0 ${classes.centerDiv} 
      ${classes.borderParent}`}
					style={{ height: "80vh", width: "53vw" }}
				>
					{/* <div
						className={`col-5 d-none d-lg-block ${classes.bgImg}`}
					></div> */}
					<div
						className={` container-fluid ${classes.backColors} col-12 ${classes.borderLeft} d-flex flex-column`}
					>
						<div
							className="fs-1 text-dark my-2 ms-1 mt-0 text-center "
							style={{
								fontFamily: " 'El Messiri', sans-serif",
							}}
						>
							Update Information
						</div>
						<hr className="mb-3" />
						<Formik
							initialValues={initialValues}
							validate={validate}
							onSubmit={onSubmit}
						>
							<Form>
								{/* <img
									src={image.url}
									alt=".."
									className="ms-5"
									style={{
										width: "150px",
										height: "150px",
										borderRadius: "50%",
									}}
								/> */}

								<Field
									className={`form-control mt-3 ms-2 ${classes.inputWidth}`}
									id="firstName"
									name="firstName"
									placeholder="First Name"
								/>
								<div className="mx-3 my-1 fw-light text-warning">
									<ErrorMessage name="firstName" />
								</div>
								<Field
									id="lastName"
									name="lastName"
									className={`form-control mt-3 ms-2  ${classes.inputWidth}`}
									placeholder="Last Name"
								/>
								<div className="mx-3  fw-light text-warning">
									<ErrorMessage name="lastName" />
								</div>
								<Field
									id="phone"
									name="phone"
									className={`form-control mt-3 ms-2  ${classes.inputWidth}`}
									placeholder="Phone Number"
									type="text"
								/>
								<div className="mx-3  fw-light text-warning">
									<ErrorMessage name="phone" />
								</div>
								<Field
									as="select"
									name="coverageArea"
									className={`form-select mt-3 ms-2  ${classes.inputWidth}`}
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
									Image Upload{" "}
									<small className="text-muted">(optional)</small>
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
													<RiFolderOpenFill className="text-warning fs-1 mt-3" />
													<p>Drag & Drop Files Here</p>
													<div className="row col-12 text-start ps-5"></div>
												</div>
											</section>
										)}
									</Dropzone>
								</div>

								<div className="mx-3  fw-light text-warning">
									<ErrorMessage name="image" />
								</div>

								<button
									type="submit"
									className="btn btn-outline-success mx-2 float-end mt-4"
								>
									Submit
								</button>
							</Form>
						</Formik>
						<div
							className="fs-3 mt-5 ms-1 "
							style={{
								fontFamily: " 'El Messiri', sans-serif",
							}}
						>
							{updateRes}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default UpdateProfile;

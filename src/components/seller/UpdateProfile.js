import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classes from "./updateProfile.module.css";
import { axiosInstance } from "../../network/axiosConfig";
import Navbar from "../shared/Navbar";

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
		if (image.size > 100000) {
			errors.image = "the maximum size for every image is 100 Kb";
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

	const fillData = async () => {
		const res = await axiosInstance.get(`seller/account/coverageArea`);
		const resAreas = res.data;
		setAreas(resAreas);
		const { data } = await axiosInstance.get(`seller/account/info`);

		setImage(data.image);

		initialValues.image = data.image.url;
		initialValues.firstName = data.firstName;
		initialValues.lastName = data.lastName;
		initialValues.phone = data.phone;
		initialValues.coverageArea = data.coverageArea._id;
		setUpdate(!update);
	};

	useEffect(() => {
		fillData();
	}, []);
	const buttons = {
		signup: true,
		login: true,
		sellerProfile: true,
	};
	return (
		<>
			<Navbar bg="bg-dark" buttons={buttons} />
			<div className={`${classes.backColor} container-fluid`}>
				<div
					className={`container shadow-lg p-0 row mt-5 ${classes.centerDiv} 
      ${classes.borderParent}`}
					style={{ height: "80vh", width: "53vw" }}
				>
					<div
						className={`col-5 d-none d-lg-block ${classes.bgImg}`}
					></div>
					<div
						className={`col-lg-7 container-fluid ${classes.backColors} col-12 ${classes.borderLeft} d-flex flex-column`}
					>
						<div
							className="fs-1 my-2 ms-1 "
							style={{
								fontFamily: " 'El Messiri', sans-serif",
							}}
						>
							Update Information
						</div>
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
									<option value="0">Select Coverage Area</option>
									{areas.map((area) => (
										<option key={area?._id} value={area?._id}>
											{area?.governorateName} - {area?.regionName}
										</option>
									))}
								</Field>

								<input
									type="file"
									name="image"
									className={`mt-3 ms-2 form-control ${classes.inputWidth} `}
									onChange={(e) => {
										uploadImage(e.target.files);
									}}
								/>
								<div className="mx-3  fw-light text-warning">
									<ErrorMessage name="image" />
								</div>

								<button
									type="submit"
									className="btn btn-outline-success ms-5 mx-2 mt-4"
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

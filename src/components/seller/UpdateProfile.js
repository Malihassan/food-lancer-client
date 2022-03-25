import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classes from "./updateProfile.module.css";
import { axiosInstance } from "../../network/axiosConfig";

let initialValues = {
	firstName: "",
	lastName: "",
	phone: "",
	coverageArea: "0",
};

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

function UpdateProfile() {
	const [update, setUpdate] = useState(false);
	const [areas, setAreas] = useState([]);
	const [updateRes, setUpdateRes] = useState("");

	const onSubmit = (values) => {
		(async () => {
			const res = await axiosInstance.patch(`seller/account/editProfile`, {
				...values,
			});
			setUpdateRes(res.data);
		})();
	};

	const fillData = async () => {
		const res = await axiosInstance.get(`seller/account/coverageArea`);
		const resAreas = res.data;
		setAreas(resAreas);
		const { data } = await axiosInstance.get(`seller/account/info`);

		initialValues.firstName = data.firstName;
		initialValues.lastName = data.lastName;
		initialValues.phone = data.phone;
		initialValues.coverageArea = data.coverageArea._id;
		setUpdate(!update);
	};

	useEffect(() => {
		fillData();
	}, []);
	return (
		<div className={`${classes.backColor} container-fluid`}>
			<div
				className={`container shadow-lg p-0 row mt-5 ${classes.centerDiv} 
      ${classes.borderParent}`}
				style={{ height: "75vh", width: "53vw" }}
			>
				<div className={`col-5 d-none d-lg-block ${classes.bgImg}`}></div>
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

							<button
								type="submit"
								className="btn btn-outline-success ms-5 mx-2 mt-4"
							>
								Submit
							</button>
							{/* <button
								type="button"
								onClick={(e) => {
									fillData();
								}}
								className="btn btn-outline-light mx-2 mt-4"
							>
								Cancel Changes
							</button> */}
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
	);
}

export default UpdateProfile;

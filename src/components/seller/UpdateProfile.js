import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import classes from "./updateProfile.module.css";

const initialValues = {
	firstName: "",
	lastName: "",
	phoneNumber: "",
};

const onSubmit = (values) => {
	console.log(values);
};

const validate = (values) => {
	let errors = {};

	if (values.firstName.length < 3 || values.firstName.length > 20) {
		errors.firstName = "Name length must be between 3 and 20";
	}

	if (values.lastName.length < 3 || values.lastName.length > 20) {
		errors.lastName = "Name length must be between 3 and 20";
	}

	if (!values.phoneNumber) {
		errors.phoneNumber = "Required";
	}
	return errors;
};

function UpdateProfile() {
	return (
		<div className={`${classes.backColor} container-fluid`}>
			<div
				className={`container shadow-lg p-0 row mt-5 ${classes.centerDiv} 
      ${classes.borderParent}`}
				style={{ height: "75vh", width: "50vw" }}
			>
				<div className={`col-5 d-none d-lg-block ${classes.bgImg}`}></div>
				<div
					className={`col-lg-7 container-fluid ${classes.backColors} col-12 ${classes.borderLeft} d-flex flex-column`}
				>
					<div className="display-6 my-2 ms-1 ">Update Information</div>
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
							<div className="mx-3 my-1 fw-light text-danger">
								<ErrorMessage name="firstName" />
							</div>
							<Field
								id="lastName"
								name="lastName"
								className={`form-control mt-3 ms-2  ${classes.inputWidth}`}
								placeholder="Last Name"
							/>
							<div className="mx-3  fw-light text-danger">
								<ErrorMessage name="lastName" />
							</div>
							<Field
								id="phoneNumber"
								name="phoneNumber"
								className={`form-control mt-3 ms-2  ${classes.inputWidth}`}
								placeholder="Phone Number"
								type="number"
							/>
							<div className="mx-3  fw-light text-danger">
								<ErrorMessage name="phoneNumber" />
							</div>
							<Field
								as="select"
								name="coverageArea"
								className={`form-select mt-3 ms-2  ${classes.inputWidth}`}
								value="0"
								aria-label="Default select example"
							>
								<option value="0">Select Coverage Area</option>
								<option value="1">One</option>
								<option value="2">Two</option>
								<option value="3">Three</option>
							</Field>

							<button
								type="submit"
								className="btn btn-outline-success ms-5 mx-2 mt-4"
							>
								Submit
							</button>
							<button className="btn btn-outline-danger mx-2 mt-4">
								Restore
							</button>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
}

export default UpdateProfile;

import React, { useState } from "react";
import "./ResetPassword.css";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
const axios = require("axios");

function ResetPassword() {
	let { token, userType } = useParams();
	const passReg = new RegExp(
		"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}"
	);
	const [newPassword, setNewPassword] = useState({
		password: "",
		confirmPassword: "",
	});
	const [newPasswordError, setNewPasswordError] = useState({
		passwordErr: null,
		confirmPasswordErr: null,
	});
	const [serverMessage, setServerMessage] = useState(null);
	const { sendRequest, hasError } = useFetch();

	const handleNewPasswordChange = (e) => {
		if (e.target.name === "newPassword") {
			setNewPassword({
				...newPassword,
				password: e.target.value,
			});
			setNewPasswordError({
				...newPasswordError,
				passwordErr:
					e.target.value.length === 0
						? "This Field is required"
						: passReg.test(e.target.value) === false
						? "invalid Password"
						: null,
			});
		} else if (e.target.name === "confirmNewPassword") {
			setNewPassword({
				...newPassword,
				confirmPassword: e.target.value,
			});
			setNewPasswordError({
				...newPasswordError,
				confirmPasswordErr:
					e.target.value.length === 0
						? "This Field is required"
						: e.target.value !== newPassword.password
						? "Password Doesn't Match"
						: null,
			});
		}
	};
	const handlePasswordSubmit = (e) => {
		e.preventDefault();
		document.cookie = `token=${token}`;
		sendRequest(
			{
				url: `${userType}/account/resetPassword`,
				method: "PATCH",
				body: { ...newPassword },
			},
			(res) => {
				if (res.status === 200) {
					setServerMessage(res.data.response);
				}
			}
		);
	};

	return (
		<>
			<div className=" text-center d-flex p-5 align-items-start justify-content-xl-start justify-content-lg-center justify-content-md-center justify-content-sm-center  resetPassword-container">
				<div className=" col-xl-4 col-lg-8 col-md-12 reset p-3 shadow-sm">
					<div className="p-5">
						<h4 className="text-light my-3">Reset Password</h4>
						<form onSubmit={handlePasswordSubmit}>
							<input
								className="form-control"
								name="newPassword"
								type="password"
								onChange={handleNewPasswordChange}
							></input>
							<div className="form-text text-warning">
								{newPasswordError.passwordErr}
							</div>
							<br></br>
							<input
								className="form-control"
								name="confirmNewPassword"
								type="password"
								onChange={handleNewPasswordChange}
							></input>
							<div className="form-text text-warning">
								{newPasswordError.confirmPasswordErr}
							</div>
							<br></br>
							<input
								to=""
								type="submit"
								className="btn btn-submit my-3 "
							></input>
						</form>
						<label className="text-center text-light">
							{serverMessage}
						</label>
					</div>
				</div>
			</div>
		</>
	);
}
export default ResetPassword;

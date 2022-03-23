import "./Login.css";
import { useState, useEffect } from "react";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
function Login() {
	const emailReg = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
	const passReg = new RegExp(
		"(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}"
	);
	const [userForm, setUserForm] = useState({
		userEmail: "",
		userPassword: "",
	});
	const [userFormError, setUserFormError] = useState({
		userEmailErr: null,
		userPasswordErr: null,
	});
	useEffect(() => {
		console.log(userForm);
	}, [userForm]);
	const handleFormChange = (e) => {
		console.log(e.target.value, e.target.id);
		if (e.target.id === "userEmail") {
			setUserForm({
				...userForm,
				userEmail: e.target.value,
			});
			setUserFormError({
				...userFormError,
				userEmailErr:
					e.target.value.length === 0
						? "This Field is required"
						: emailReg.test(e.target.value) === false
						? "invalid Email"
						: null,
			});
		} else if (e.target.id === "userPassword") {
			setUserForm({
				...userForm,
				userPassword: e.target.value,
			});
			setUserFormError({
				...userFormError,
				userPasswordErr:
					e.target.value.length === 0
						? "This Field is required"
						: passReg.test(e.target.value) === false
						? "invalid password"
						: null,
			});
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(userForm);
	};
	return (
		<>
			<div className="w-75 m-auto text-center ">
				<h3 className="my-4">Login Form</h3>
				<form onSubmit={(e) => handleSubmit(e)}>
					<div className="">
						<div className="mb-3 ">
							<div className="input-group flex-nowrap my-2 ">
								<span
									className="input-group-text icon-container"
									id="emailHelp"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-person"
										viewBox="0 0 16 16"
									>
										<path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
									</svg>
								</span>
								<input
									name="userEmail"
									type="email"
									className="form-control "
									id="userEmail"
									placeholder=" Enter Your Email"
									aria-label="Username"
									aria-describedby="emailHelp"
									onChange={(e) => handleFormChange(e)}
								/>
							</div>
							<div id="emailHelp" className="form-text text-danger">
								{userFormError.userEmailErr}
							</div>
						</div>
						<div className="mb-3">
							<div className="input-group flex-nowrap">
								<span
									className="input-group-text icon-container"
									id="passwordHelp"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="16"
										height="16"
										fill="currentColor"
										class="bi bi-lock"
										viewBox="0 0 16 16"
									>
										<path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
									</svg>
								</span>
								<input
									name="userPassword"
									type="password"
									className="form-control"
									id="userPassword"
									placeholder=" Enter Your Password"
									aria-label="userPassword"
									aria-describedby="passwordHelp"
									onChange={(e) => handleFormChange(e)}
								></input>
							</div>
							<div id="passwordHelp" className="form-text text-danger">
								{userFormError.userPasswordErr}
							</div>
						</div>
						<div className="d-flex justify-content-around align-items-center p-4">
							<div>
								<Link className="forgit-link " to="">
									forget password ???
								</Link>
							</div>
							<button type="submit" className="btn btn-submit px-4">
								Login
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}

export default Login;

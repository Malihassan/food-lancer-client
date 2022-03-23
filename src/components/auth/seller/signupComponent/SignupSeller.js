import React from "react";
import "./SignupSeller.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");
//import { Link } from 'react-router-dom';
function SignupSeller() {
  const emailReg = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  const nameReg = new RegExp("^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$");
  const phoneReg = new RegExp("^01[1,2,5,0][0-9]{8}$");
  const passReg = new RegExp(
    "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}"
  );
  const [coverageAreas, setCoverageAreas] = useState([]);
  const [userForm, setUserForm] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    //image:"",
    password: "",
    phone: "",
    email: "",
    gender: "",
    coverageArea: "",
  });
  const [userFormError, setUserFormError] = useState({
    userNameErr: null,
    firstNameErr: null,
    lastNameErr: null,
    passwordErr: null,
    confirmPasswordErr: null,
    phoneErr: null,
    emailErr: null,
    genderErr: null,
  });
  useEffect(() => {
    return axios
      .get("http://localhost:3001/seller/account/coverageArea")
      .then((response) => {
        setCoverageAreas(response.data.coverageAreas);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

    //console.log(userForm);
  }, [userForm]);
  const handleFormChange = (e) => {
    console.log(e.target.checked);
    console.log(e.target.value);
    console.log(e.target.id);
    switch (e.target.name) {
      case "sellerUserName":
        setUserForm({
          ...userForm,
          userName: e.target.value,
        });
        setUserFormError({
          ...userFormError,
          userNameErr:
            e.target.value.length === 0
              ? "This Field is required"
              : nameReg.test(e.target.value) === false
              ? "invalid User Name"
              : null,
        });
        break;
      case "sellerFirstName":
        setUserForm({
          ...userForm,
          firstName: e.target.value,
        });
        setUserFormError({
          ...userFormError,
          firstNameErr:
            e.target.value.length === 0
              ? "This Field is required"
              : nameReg.test(e.target.value) === false
              ? "invalid First Name"
              : null,
        });
        break;
      case "sellerLastName":
        setUserForm({
          ...userForm,
          lastName: e.target.value,
        });
        setUserFormError({
          ...userFormError,
          lastNameErr:
            e.target.value.length === 0
              ? "This Field is required"
              : nameReg.test(e.target.value) === false
              ? "invalid Last Name"
              : null,
        });
        break;
      case "sellerPassword":
        setUserForm({
          ...userForm,
          password: e.target.value,
        });
        setUserFormError({
          ...userFormError,
          passwordErr:
            e.target.value.length === 0
              ? "This Field is required"
              : passReg.test(e.target.value) === false
              ? "invalid Password"
              : null,
        });
        break;
      case "sellerPhone":
        setUserForm({
          ...userForm,
          phone: e.target.value,
        });
        setUserFormError({
          ...userFormError,
          phoneErr:
            e.target.value.length === 0
              ? "This Field is required"
              : phoneReg.test(e.target.value) === false
              ? "invalid Phone"
              : null,
        });
        break;
      case "sellerEmail":
        setUserForm({
          ...userForm,
          email: e.target.value,
        });
        setUserFormError({
          ...userFormError,
          emailErr:
            e.target.value.length === 0
              ? "This Field is required"
              : emailReg.test(e.target.value) === false
              ? "invalid Email"
              : null,
        });
        break;
      case "sellerGender":
        setUserForm({
          ...userForm,
          gender: e.target.value,
        });
        setUserFormError({
          ...userFormError,
          genderErr:
            e.target.checked !== true ? "This Field is required" : null,
        });
        break;

      default:
        break;
    }
  };
  const handleSignupSellerSubmit = (e) => {
    //console.log(coverageAreas);
    console.log(e);
    e.preventDefault();
    console.log(userForm);
    console.log(userFormError);
    axios
      .post("http://localhost:3001/seller/account/signup", {
        ...userForm,
      })
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="w-75 m-auto text-center ">
        <h3 className="my-4 login-header">Signup Form</h3>
        <form onSubmit={(e) => handleSignupSellerSubmit(e)}>
          <div className="">
            <div className="mb-3 ">
              <div className="input-group flex-nowrap my-2 ">
                <span
                  className="input-group-text icon-container"
                  id="sellerUserNameHelp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fillRule="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                </span>
                <input
                  name="sellerUserName"
                  type="text"
                  className="form-control "
                  id="sellerUserName"
                  placeholder=" Enter Your User Name"
                  aria-label="sellerUserName"
                  aria-describedby="sellerUserNameHelp"
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
              <div id="sellerUserNameHelp" className="form-text text-warning">
                {userFormError.userNameErr}
              </div>
            </div>
            <div className="mb-3 ">
              <div className="input-group flex-nowrap my-2 ">
                <span
                  className="input-group-text icon-container"
                  id="sellerFirstNameHelp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fillRule="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                </span>
                <input
                  name="sellerFirstName"
                  type="text"
                  className="form-control "
                  id="sellerFirstName"
                  placeholder=" Enter Your First Name"
                  aria-label="sellerFirstName"
                  aria-describedby="sellerFirstNameHelp"
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
              <div id="emailHelp" className="form-text text-warning">
                {userFormError.firstNameErr}
              </div>
            </div>
            <div className="mb-3 ">
              <div className="input-group flex-nowrap my-2 ">
                <span
                  className="input-group-text icon-container"
                  id="sellerLastNameHelp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fillRule="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                </span>
                <input
                  name="sellerLastName"
                  type="text"
                  className="form-control "
                  id="sellerLastName"
                  placeholder=" Enter Your Last Name"
                  aria-label="sellerLastName"
                  aria-describedby="sellerLastNameHelp"
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
              <div id="emailHelp" className="form-text text-warning">
                {userFormError.lastNameErr}
              </div>
            </div>

            <div className="mb-3">
              <div className="input-group flex-nowrap">
                <span
                  className="input-group-text icon-container"
                  id="sellerPasswordHelp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fillRule="currentColor"
                    className="bi bi-lock"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                  </svg>
                </span>
                <input
                  name="sellerPassword"
                  type="password"
                  className="form-control"
                  id="sellerPassword"
                  placeholder=" Enter Your Password"
                  aria-label="sellerPassword"
                  aria-describedby="sellerPasswordHelp"
                  onChange={(e) => handleFormChange(e)}
                ></input>
              </div>
              <div id="passwordHelp" className="form-text text-danger">
                {userFormError.passwordErr}
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group flex-nowrap">
                <span
                  className="input-group-text icon-container"
                  id="sellerConfirmPasswordHelp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-lock"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                  </svg>
                </span>
                <input
                  name="sellerConfirmPassword"
                  type="password"
                  className="form-control"
                  id="sellerConfirmPassword"
                  placeholder=" ReEnter Your Password"
                  aria-label="sellerConfirmPassword"
                  aria-describedby="sellerConfirmPasswordHelp"
                  onChange={(e) => handleFormChange(e)}
                ></input>
              </div>
              {/* <div id="passwordHelp" className="form-text text-danger">
              {userFormError.userPasswordErr}
            </div> */}
            </div>
            <div className="mb-3">
              <div className="input-group flex-nowrap">
                <span
                  className="input-group-text icon-container"
                  id="sellerPhoneHelp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fillRule="currentColor"
                    className="bi bi-phone"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z" />
                    <path d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                  </svg>
                </span>
                <input
                  name="sellerPhone"
                  type="text"
                  className="form-control"
                  id="sellerPhone"
                  placeholder=" Enter Your Phone"
                  aria-label="sellerPhone"
                  aria-describedby="sellerPhoneHelp"
                  onChange={(e) => handleFormChange(e)}
                ></input>
              </div>
              <div id="passwordHelp" className="form-text text-warning">
                {userFormError.phoneErr}
              </div>
            </div>

            <div className="mb-3 ">
              <div className="input-group flex-nowrap my-2 ">
                <span
                  className="input-group-text icon-container"
                  id="sellerEmailHelp"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fillRule="currentColor"
                    className="bi bi-envelope"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                  </svg>
                </span>
                <input
                  name="sellerEmail"
                  type="email"
                  className="form-control "
                  id="sellerEmail"
                  placeholder=" Enter Your Email"
                  aria-label="sellerEmail"
                  aria-describedby="sellerEmailHelp"
                  onChange={(e) => handleFormChange(e)}
                />
              </div>
              <div id="sellerEmailHelp" className="form-text text-warning">
                {userFormError.emailErr}
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <div className="mb-3 ">
                <div
                  onChange={(e) => handleFormChange(e)}
                  className="input-group flex-nowrap my-2 "
                >
                  <div className="form-check mx-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sellerGender"
                      id="male"
                      value="male"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault1"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fillRule="currentColor"
                        className="bi bi-gender-male"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.5 2a.5.5 0 0 1 0-1h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0V2.707L9.871 6.836a5 5 0 1 1-.707-.707L13.293 2H9.5zM6 6a4 4 0 1 0 0 8 4 4 0 0 0 0-8z"
                        />
                      </svg>
                    </label>
                  </div>
                  <div className="form-check mx-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="sellerGender"
                      id="female"
                      value="female"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexRadioDefault2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fillRule="currentColor"
                        className="bi bi-gender-female"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 1a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM3 5a5 5 0 1 1 5.5 4.975V12h2a.5.5 0 0 1 0 1h-2v2.5a.5.5 0 0 1-1 0V13h-2a.5.5 0 0 1 0-1h2V9.975A5 5 0 0 1 3 5z"
                        />
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="form-text text-warning">
                  {userFormError.genderErr}
                </div>
              </div>
              <div className="mb-3 ">
                <select onChange={(e) => handleFormChange(e)} className="form-select" aria-label="Default select example">
                  {coverageAreas.map((coverageArea) => {
                    return (
                      <option
                        key={coverageArea._id}
                        value={coverageArea.regionName}
                        
                      >
                        {coverageArea.regionName}
                      </option>
                    );
                  })}
                </select>
                {/*   <div id="sellerEmailHelp" className="form-text text-warning">
                {userFormError.emailErr}
              </div> */}
              </div>
            </div>

            <button type="submit" className="btn btn-submit px-4">
              Signup
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default SignupSeller;

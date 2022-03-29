import React, { useRef, useEffect, useState } from "react";
import "./SignupSeller.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
const axios = require("axios");
function SignupSeller() {
  let navigate = useNavigate();
  const [coverageAreas, setCoverageAreas] = useState();
  //const { setError, formState: { errors } } = useForm();
 const [serverMessage, setServerMessage] = useState();
   /* const [userNameErr, setUserNameErr] = useState("");
  const [phoneErr, setPhoneErr] = useState(""); */
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let formData = new FormData();
    const image = data.image[0];
    formData.append("image", image);
    formData.append("userName", data.userName);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("gender", data.gender);
    formData.append("email", data.email);
    formData.append("coverageArea", data.coverageArea);
    axios
      .post("http://localhost:3001/seller/account/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        if (response.status === 200) {
          setServerMessage(response.data.message);
          setTimeout(() => {
            navigate("/login");
          }, 5000);
          return;
        }
      })
      .catch(function (error) {
        const valErr = error.response.data.errors;
        if (valErr) {
          for (let key in valErr) {
            switch (key) {
              case "userName":
                setError("userName", {
                  type: "manual",
                  message: `${key} already exist`,
                });
                break;
              case "email":
                console.log("errrrrrror");
                setError("email", {
                  type: "manual",
                  message: `${key} already exist`,
                });
                break;
              case "phone":
                setError("phone", {
                type: "manual",
                message: `${key} already exist`,
              });
                break;
              default:
                break;
            }
          }
          return
        }
setServerMessage(error.response.data)
      });
  };
  const password = useRef({});
  password.current = watch("password", "");
  useEffect(() => {
    return axios
      .get("http://localhost:3001/seller/account/coverageArea")
      .then((response) => {
        console.log(response.data);
        setCoverageAreas(response.data);
      })
      .catch(function (error) {
        console.log(error);
        //setServerMessage(error)
      });
  }, []);
  return (
    <>
      <div className="w-75 m-auto text-center signup-form  bg-black">
        <h3 className="my-4 login-header">Signup Form</h3>
        <div className="d-flex justify-content-around">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 ">
              <div className="input-group flex-nowrap my-2 ">
                <span
                  className="input-group-text icon-container"
                  id="userNameHelp"
                >
                  <FontAwesomeIcon icon="fas fa-user" />
                </span>
                <input
                  {...register("userName", {
                    required: "this field is required",
                    pattern: {
                      value: /^([\w]{3,})+\s+([\w\s]{3,})+$/i,
                      message: `user input is invalid`,
                    },
                  })}
                  name="userName"
                  type="text"
                  className="form-control "
                  id="userName"
                  placeholder=" Enter Your User Name"
                />
              </div>
              <div className="form-text text-warning">
                <ErrorMessage
                  errors={errors}
                  name="userName"
                  render={({ message }) => (
                    <small className="form-text text-warning">{message}</small>
                  )}
                />
              </div>
            </div>
            <div className="mb-3 ">
              <div className="input-group flex-nowrap my-2 ">
                <span
                  className="input-group-text icon-container"
                  id="firstNameHelp"
                >
                  <FontAwesomeIcon icon="fas fa-user" />
                </span>
                <input
                  {...register("firstName", {
                    required: "this field is required",
                    pattern: {
                      value: /[a-z]{1,10}/g,
                      message: `first name input is invalid`,
                    },
                  })}
                  type="text"
                  className="form-control "
                  id="firstName"
                  placeholder=" Enter Your First Name"
                />
              </div>
              <div className="form-text text-warning">
                <ErrorMessage
                  errors={errors}
                  name="firstName"
                  render={({ message }) => <small>{message}</small>}
                />
              </div>
            </div>
            <div className="mb-3 ">
              <div className="input-group flex-nowrap my-2 ">
                <span
                  className="input-group-text icon-container"
                  id="lastNameHelp"
                >
                  <FontAwesomeIcon icon="fas fa-user" />
                </span>
                <input
                  {...register("lastName", {
                    required: "this field is required",
                    pattern: {
                      value: /[a-z]{1,10}/g,
                      message: `last name input is invalid`,
                    },
                  })}
                  type="text"
                  className="form-control "
                  id="lastName"
                  placeholder=" Enter Your Last Name"
                />
              </div>
              <div className="form-text text-warning">
                <ErrorMessage
                  errors={errors}
                  name="lastName"
                  render={({ message }) => <small>{message}</small>}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group flex-nowrap">
                <span
                  className="input-group-text icon-container"
                  id="passwordHelp"
                >
                  <FontAwesomeIcon icon="fas fa-lock" />
                </span>
                <input
                  {...register("password", {
                    required: "this field is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/,
                      message: `password input is invalid`,
                    },
                  })}
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder=" Enter Your Password"
                ></input>
              </div>
              <div className="form-text text-warning">
                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => <small>{message}</small>}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group flex-nowrap">
                <span
                  className="input-group-text icon-container"
                  id="confirmPasswordHelp"
                >
                  <FontAwesomeIcon icon="fas fa-lock" />
                </span>
                <input
                  {...register("confirmPassword", {
                    required: "this field is required",
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
                  })}
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder=" ReEnter Your Password"
                ></input>
              </div>
              <div>
                <div className="form-text text-warning">
                  <ErrorMessage
                    errors={errors}
                    name="confirmPassword"
                    render={({ message }) => <small>{message}</small>}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group flex-nowrap">
                <span
                  className="input-group-text icon-container"
                  id="phoneHelp"
                >
                  <FontAwesomeIcon icon="fas fa-mobile" />
                </span>
                <input
                  {...register("phone", {
                    required: "this field is required",
                    pattern: {
                      value: "",
                      message: `phone input is invalid`,
                    },
                  })}
                  type="text"
                  className="form-control"
                  id="phone"
                  placeholder=" Enter Your Phone"
                ></input>
              </div>
              <div className="form-text text-warning">
                <ErrorMessage
                  errors={errors}
                  name="phone"
                  render={({ message }) => <small>{message}</small>}
                />
 {/* {errors.phone && <p className="text-danger">{errors.phone.message}</p>} */}
              </div>
            </div>
            <div className="mb-3 ">
              <div className="input-group flex-nowrap my-2 ">
                <span
                  className="input-group-text icon-container"
                  id="emailHelp"
                >
                  <FontAwesomeIcon icon="fas fa-at" />
                </span>
                <input
                  {...register("email", {
                    required: "this field is required",
                    pattern: {
                      value: /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: `email input is invalid`,
                    },
                  })}
                  type="email"
                  className="form-control "
                  id="email"
                  placeholder=" Enter Your Email"
                />
              </div>
              <div className="form-text text-warning">
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <small className="form-text text-warning">{message}</small>
                  )}
                />
              </div>
            </div>
            <div className="mb-3 ">
              <div className="input-group flex-nowrap my-2">
                <select
                  {...register("coverageArea", {
                    required: "this field is required",
                  })}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="" name="coverageArea">
                    Select Coverage Area
                  </option>
                  {coverageAreas?.map((coverageArea) => {
                    return (
                      <option
                        key={coverageArea?._id}
                        value={coverageArea?._id}
                        name="coverageArea"
                      >
                        {coverageArea?.regionName}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-text text-warning">
                <ErrorMessage
                  errors={errors}
                  name="coverageArea"
                  render={({ message }) => <small>{message}</small>}
                />
              </div>
            </div>
            <div className="mb-3 ">
              <div className="input-group d-flex justify-content-start my-2">
                <div>
                  <label className="form-check-label mx-3">Female</label>
                  <input
                    {...register("gender", {
                      required: "this field is required",
                    })}
                    type="radio"
                    value="female"
                  />
                </div>
                <div>
                  <label className="form-check-label mx-3">Male</label>
                  <input
                    {...register("gender", {
                      required: "this field is required",
                    })}
                    type="radio"
                    value="male"
                  />
                </div>
              </div>

              <div className="form-text text-warning">
                <ErrorMessage
                  errors={errors}
                  name="gender"
                  render={({ message }) => <small>{message}</small>}
                />
              </div>
            </div>
            <div className="mb-3">
              <div className="input-group flex-nowrap">
                <span
                  className="input-group-text icon-container"
                  id="imageHelp"
                >
                  <FontAwesomeIcon icon="fa-solid fa-image" />
                </span>
                <input
                  {...register("image", {
                    required: "this field is required",
                  })}
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                ></input>
              </div>
              <div>
                <div className="form-text text-warning">
                  <ErrorMessage
                    errors={errors}
                    name="image"
                    render={({ message }) => <small>{message}</small>}
                  />
                </div>
              </div>
            </div>
            {serverMessage && (
								<div className="form-text text-warning">
									{serverMessage}
								</div>
							)}
            <button type="submit" className="btn btn-submit px-4">
              Signup
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupSeller;

import React, { useRef,useState } from "react";
import "./SignupBuyer.scss";
import { useForm } from "react-hook-form";
import useFetch from "../../../../hooks/useFetch";
import { ErrorMessage } from "@hookform/error-message";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faMobile,
  faAt,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function SignupBuyer() {
  let navigate = useNavigate();
  const [serverMessage, setServerMessage] = useState();
  const { sendRequest, hasError } = useFetch();
  const {
    register,
    handleSubmit,
    watch,
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
    formData.append("address", data.address);

    function signupSellerProfilehandler(res) {
      if (res.status === 200) {
        setServerMessage(res.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    }

    sendRequest(
      {
        url: `buyer/account/signup`,
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
      signupSellerProfilehandler
    );
  };
  const password = useRef({});
  password.current = watch("password", "");
  return (
    <>
      <div className="w-75 m-auto text-center signup-form">
        <h3 className="my-4 login-header">Signup Form</h3>
        <div className="d-flex justify-content-around">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 ">
              <div className="input-group flex-nowrap my-2 ">
                <span
                  className="input-group-text icon-container"
                  id="userNameHelp"
                >
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  {...register("userName", {
                    required: "this field is required",
                    pattern: {
                      value: /^[a-zA-Z0-9]+$/,
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
                  <FontAwesomeIcon icon={faUser} />
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
                  <FontAwesomeIcon icon={faUser} />
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
                  <FontAwesomeIcon icon={faLock} />
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
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  {...register("confirmPassword", {
                    required: "this field is required",
                    validate: (value) =>
                      value === password.current ||
                      "The password doesn't match",
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
                  <FontAwesomeIcon icon={faMobile} />
                </span>
                <input
                  {...register("phone", {
                    required: "this field is required",
                    pattern: {
                      value: /^01[0125]\d{8}$/,
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
                  <FontAwesomeIcon icon={faAt} />
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
              <div className="input-group flex-nowrap my-2 ">
                <span
                  className="input-group-text icon-container"
                  id="addressHelp"
                >
                  <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                </span>
                <input
                  {...register("address", {
                    required: "this field is required",
                  })}
                  type="text"
                  className="form-control "
                  id="address"
                  placeholder=" Enter Your address"
                />
              </div>
              <div className="form-text text-warning">
                <ErrorMessage
                  errors={errors}
                  name="address"
                  render={({ message }) => (
                    <small className="form-text text-warning">{message}</small>
                  )}
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
                  <FontAwesomeIcon icon={faImage} />
                </span>
                <input
                  {...register("image", {
                    required: "this field is required",
                  })}
                  type="file"
                  className="form-control"
                  id="image"
                  name="image"
                  accept="image/*"
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

            <button
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
              type="submit"
              className="btn btn-submit px-4"
            >
              Signup
            </button>
            {serverMessage && (
              /*   <div className="modal fade mt-5"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog ">
                  <div className="modal-content modal-container">
                    <div className="modal-header border-0">
                    </div>
                    <div className="modal-body ">{serverMessage}</div>
                    <div className="modal-footer border-0">
                      <button
                        type="button"
                        className="btn btn-submit px-4"
                        data-bs-dismiss="modal"
                      >
                        Ok!
                      </button>
                    </div>
                  </div>
                </div>
              </div> */

              <div className="form-text text-warning">{serverMessage}</div>
            )}
            {hasError?.error && (
              <div className="form-text text-warning">{hasError?.error}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default SignupBuyer;

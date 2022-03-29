import "./ForgetPassword.css";
import React from "react";
import { useState } from "react";
import { axiosInstance } from "./../../network/axiosConfig";
import { useNavigate } from 'react-router-dom';
function ForgetPassword() {
  const [sellerEmail, setEmail] = useState();
  const [message, setMessage] = useState();
  let navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post("seller/account/forgetPassword", {
        email: sellerEmail,
      })
      .then((response) => {
        console.log(response);
         if (response.status === 200) {
          setMessage(response.data.response);
          setTimeout(() => {
            navigate("/home");
          }, 5000);
          return;
        } 
      })
      .catch(function (err) {
        console.log(err.response.data.error);
        setMessage(err.response.data.error);
      });
  };
  return (
    <>
      <div className=" d-flex m-0 align-items-center vh-100 text-center forgetPassword-container">
        <div className=" shadow-sm">
          <div className="p-5">
            <h4 className="text-light my-3">Find Your Account</h4>
            <p className="text-light">
              Please enter your email address to search for your account.
            </p>
            <form onSubmit={(e) => handleEmailSubmit(e)}>
              <input
                className="form-control"
                name="sellerEmail"
                type="text"
                onChange={(e) => handleEmailChange(e)}
              ></input>
              <br></br>
              <input
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                to=""
                id="liveToastBtn"
                type={"submit"}
                className="btn btn-submit my-3 "
              ></input>
              {/* modal */}
              <div
                className="modal fade mt-5"
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
                      {/* <h5 className="modal-title" id="staticBackdropLabel">
                        Message
                      </h5> */}
                     {/*  <button
                        type="button"
                        className="btn-close "
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button> */}
                    </div>
                    <div className="modal-body ">{message}</div>
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
              </div>
              {/* end of modal */}
            </form>
            {/*  <div>
        {message && (
          <div className="form-text text-warning my-3">{message}</div> 
              )}
        </div>   */}
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgetPassword;

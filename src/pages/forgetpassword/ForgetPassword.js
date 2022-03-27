import React from "react";
import "./ForgetPassword.module.css";
import { useState } from "react";
import { axiosInstance } from "./../../network/axiosConfig";
function ForgetPassword() {
  const [sellerEmail, setEmail] = useState();
  const [message,setMessage]=useState()
  //let navigate = useNavigate();
  const handleEmailChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };
  const handleEmailSubmit = (e) => {
    console.log(sellerEmail);
    e.preventDefault();
    axiosInstance
      .post("seller/account/forgetPassword", {
        email:sellerEmail,
      })
      .then((response) => {
        console.log(response.data.response);
setMessage(response.data.response)
//navigate("/seller/account/resetPassword/:token");
      })
      .catch(function (err) {
        console.log(err.response.data.error);
        setMessage(err.response.data.error)
      
      });
  };
  return (
    <>
      <div className="container d-flex m-0 align-items-center vh-100  text-center ">
      <div className=" shadow-sm">
       <div className="p-5">
       <h4 className="text-light my-3">Find Your Account</h4>
        <p className="text-light">Please enter your email address to search for your account.</p>
        <form onSubmit={(e) => handleEmailSubmit(e)}>
          <input
          className="form-control"
            name="sellerEmail"
            type="text"
            onChange={(e) => handleEmailChange(e)}
          ></input>
          <br></br>
          <input to="" type={"submit"} className="btn btn-outline-light my-3 "></input>
        </form>
        <div>
        {message && (
                <div className="form-text text-warning my-3">{message}</div>
              )}
        </div>
       </div>
      </div>
      </div>
    </>
  );
}

export default ForgetPassword;

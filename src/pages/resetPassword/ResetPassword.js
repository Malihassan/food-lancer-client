import React,{useState} from 'react'

import {useParams  } from "react-router-dom";
const axios = require('axios');
function ResetPassword() {
  
  let { token } = useParams();
  //document.cookie =`token=${token}`;
  console.log(token);
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
  
  const handleNewPasswordChange=(e)=>{
    console.log(e.target.value, e.target.name);
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
            : e.target.value!==newPassword.password
            ? "Password Doesn't Match"
            : null,
      });
    }
  }
  const handlePasswordSubmit = (e) => {
    console.log(newPassword);
    console.log(token);
    e.preventDefault();
    axios
      .patch(`http://localhost:3001/seller/account/resetPassword`,{...newPassword},{
        headers:{"token":`${token}`}
      })
      .then((response) => {
        console.log(response);
//setMessage(response.data.response)
      })
      .catch(function (err) {
        console.log(err);
        //setMessage(err.response.data.error)
      
      });
  };

  return (
   <>
  <div className="container d-flex m-0 align-items-center vh-100  text-center ">
      <div className=" shadow-sm">
       <div className="p-5">
       <h4 className="text-light my-3">Reset Password</h4>
    <form onSubmit={(e) => handlePasswordSubmit(e)}>
          <input
          className="form-control"
            name="newPassword"
            type="password"
            onChange={(e) => handleNewPasswordChange(e)}
          ></input>
           <div  className="form-text text-warning">
                {newPasswordError.passwordErr}
              </div> 
          <br></br>
          <input
          className="form-control"
            name="confirmNewPassword"
            type="password"
            onChange={(e) => handleNewPasswordChange(e)}
          ></input>
          <div  className="form-text text-warning">
                {newPasswordError.confirmPasswordErr}
              </div> 
          <br></br>
          
          <input to="" type={"submit"} className="btn btn-outline-light my-3 "></input>
        </form>
        </div>
        </div>
        </div>
   </>
    
  )
}

export default ResetPassword
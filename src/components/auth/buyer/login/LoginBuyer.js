import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyerLogin } from "../../../../store/AuthSlice";
function LoginBuyer(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errResMes = useSelector((state) => state.auth.resErrorMes);
  const [socket, setSocket] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [inputErrorMessage, setInputErrorMessage] = useState({
    email: "",
    password: "",
  });

  const addToForm = (inputName, value) => {
    setInputErrorMessage({
      ...inputErrorMessage,
      [inputName]: null,
    });
    setFormData({ ...formData, [inputName]: value });
  };

  const emailValidator = (e) => {
    const value = e.target.value;
    const reg = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const validEmail = reg.test(value);
    validEmail
      ? addToForm("email", value)
      : setInputErrorMessage({
          ...inputErrorMessage,
          email: "Invalid Email",
        });
  };
  const passwordValidator = (e) => {
    const value = e.target.value;
    // const reg = new RegExp(
    //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g
    // );
    // const validpassword = reg.test(value);

    const validpassword = true;
    validpassword
      ? addToForm("password", value)
      : setInputErrorMessage({
          ...inputErrorMessage,
          password: "Invalid Password Example MMvv##20",
        });
  };
  let formIsValid = false;
  if (!inputErrorMessage.email && !inputErrorMessage.password) {
    formIsValid = true;
  }
  const handleLoginSellerSubmit = (e) => {
    e.preventDefault();
    dispatch(buyerLogin(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        const socket  = props.socket
        console.log(socket);
        socket.emit('addSeller',res.payload._id)
        navigate("/home");
      }
    });
  };

  return (
    <div className="w-75 m-auto text-center ">
      <form className="mt-5" onSubmit={handleLoginSellerSubmit}>
        <div className="d-flex flex-column">
          <div className="mb-2">
            <div className="input-group flex-nowrap my-2 ">
              <span className="input-group-text icon-container" id="emailHelp">
                <FontAwesomeIcon icon={faUser} />
              </span>
              <input
                name="userEmail"
                type="email"
                className="form-control "
                placeholder=" Enter Your Email"
                aria-label="Username"
                aria-describedby="emailHelp"
                onChange={emailValidator}
              />
            </div>
            {inputErrorMessage.email && (
              <small className="form-text float-start text-warning">
                {inputErrorMessage.email}
              </small>
            )}
          </div>
          <div className="mb-4">
            <div className="input-group flex-nowrap">
              <span
                className="input-group-text icon-container"
                id="passwordHelp"
              >
                <FontAwesomeIcon icon={faLock} />
              </span>
              <input
                name="userPassword"
                type="password"
                className="form-control"
                placeholder=" Enter Your Password"
                aria-label="userPassword"
                aria-describedby="passwordHelp"
                onChange={passwordValidator}
              ></input>
            </div>
            {inputErrorMessage.password && (
              <small className="form-text float-start mb-2 text-warning">
                {inputErrorMessage.password}
              </small>
            )}
            {errResMes && (
              <div className="form-text text-warning">{errResMes}</div>
            )}
          </div>
          <div className="d-flex flex-row-reverse justify-content-between align-items-center pb-3 mt-4">
            <button
              type="submit"
              disabled={!formIsValid}
              className="btn btn-submit px-4 "
            >
              Login
            </button>
            <div>
              <Link className="forget-link text-warning" to="/forgetpassword/buyer">
                forget password ?
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default LoginBuyer;

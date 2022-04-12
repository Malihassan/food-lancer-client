import "./LoginSeller.css";
import { useState, useEffect } from "react";
import { sellerLogin } from "../../../../store/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";

function LoginSeller() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const errResMes = useSelector((state) => state.auth.resErrorMes);

  const [socket, setSocket] = useState(null);
  const emailReg = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  const passReg = new RegExp(
    "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}"
  );
  const [userForm, setUserForm] = useState({
    userEmail: "",
    userPassword: "",
  });
  //const[sellerState,setSellerState]=useState(false)
  const [userFormError, setUserFormError] = useState({
    userEmailErr: null,
    userPasswordErr: null,
  });
  useEffect(() => {}, [userForm, userFormError]);

  const handleFormChange = (e) => {
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
            : passReg.test(e.target.value) === true
            ? "invalid password"
            : null,
      });
    }
  };
  const handleLoginSellerSubmit = (e) => {
    e.preventDefault();
    dispatch(sellerLogin(userForm)).then((res) => {
		console.log(res.payload._id);
      if (res.meta.requestStatus === "fulfilled") {
        // setSocket(	
        //   io("http://localhost:3300", {
        //     query: { type: "seller", id: res.payload._id },
        //   })
        // );

        // dispatch(socketActions.connect({type:'seller',id:'5252'}))

        navigate("/seller/home");
        // window.location.reload();
      }
    });
    // here must
  };
  return (
    <>
      <div className="w-75 m-auto text-center ">
        <h3 className="my-4 login-header">Login Form</h3>
        <form onSubmit={(e) => handleLoginSellerSubmit(e)}>
          <div className="">
            <div className="mb-3 ">
              <div className="input-group flex-nowrap my-2 ">
                <span
                  className="input-group-text icon-container"
                  id="emailHelp"
                >
                  <FontAwesomeIcon icon={faUser} />
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
              <div id="sellerEmailHelp" className="form-text text-warning">
                {userFormError.userEmailErr}
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
              {errResMes && (
                <div className="form-text text-warning">{errResMes}</div>
              )}
            </div>
            <div className="d-flex flex-row-reverse justify-content-between align-items-center pb-3 mt-4">
              <button type="submit" className="btn btn-submit px-4  mb-3">
                Login
              </button>
              <div>
                <Link className="forget-link " to="/forgetpassword">
                  forget password ?
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default LoginSeller;

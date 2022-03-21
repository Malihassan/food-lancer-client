
import "./Login.css"
import { useState ,useEffect} from 'react';
function Login() {
  const emailReg = new RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
  const passReg = new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}")
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
    fetch("http://localhost:3000/seller/account/login")
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          //setIsLoaded(true);
          //setItems(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
         // setIsLoaded(true);
         // setError(error);
        }
      )
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
      <div className="w-50 m-auto">
        <h2>Login Form</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="mb-3">
            <label htmlFor="userEmail" className="form-label">
              Email address
            </label>
            <input
            name="userEmail"
              type="email"
              className="form-control"
              id="userEmail"
              aria-describedby="emailHelp"
              onChange={(e) => handleFormChange(e)}
            ></input>
           <div id="emailHelp" className="form-text text-danger">
               {userFormError.userEmailErr} 
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="userPassword" className="form-label">
              Password
            </label>
            <input
            name="userPassword"
              type="password"
              className="form-control"
              id="userPassword"
              onChange={(e) => handleFormChange(e)}
            ></input>
              <div id="passwordHelp" className="form-text text-danger">
               {userFormError.userPasswordErr} 
            </div> 
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Login
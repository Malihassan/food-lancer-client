import React from 'react'
import SignupSeller from './../../components/auth/seller/signupComponent/SignupSeller';
import "./SignupPage.css"
function SignupPage() {
  return (
    <>
      <div className="d-flex row p-5 align-items-center ">
      <div className="col-xl-4 login ">
        <nav className="">
          <div className="nav nav-tabs" id="nav-tab" role="tablist">
            <button
              className="nav-link active"
              id="nav-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-home"
              type="button"
              role="tab"
              aria-controls="nav-home"
              aria-selected="true"
            >
              Signup as Seller
            </button>
            <button
              className="nav-link"
              id="nav-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-profile"
              type="button"
              role="tab"
              aria-controls="nav-profile"
              aria-selected="false"
            >
              Signup as Buyer
            </button>
          </div>
        </nav>
        <div className="tab-content " id="nav-tabContent">
          <div
            className="tab-pane fade show active"
            id="nav-home"
            role="tabpanel"
            aria-labelledby="nav-home-tab"
          >
            <SignupSeller></SignupSeller>
          </div>
          <div
            className="tab-pane fade"
            id="nav-profile"
            role="tabpanel"
            aria-labelledby="nav-profile-tab"
          >
            blahhhhhhhh
          </div>
        </div>
      </div>
      </div>
    </>

  )
}

export default SignupPage
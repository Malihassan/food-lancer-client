import React from "react";
import classes from "./product-form.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";

const initialValues = {
  nameOfProduct: "",
  description: "",
  price: 0,
  images: [],
};
const onSubmit = (values) => {
  console.log(values);
};

const validate = (values) => {
  let errors = {};

  if (values.nameOfProduct.length < 1) {
    errors.nameOfProduct = "this feild is required";
  }
  if (values.description.length < 1) {
    errors.description = "this feild is required";
  }
  if (values.price.length < 1) {
    errors.price = "this feild is required";
  }
  if (parseInt(values.price) < 1) {
    errors.price = "the value of price must be positive";
  }
  if (values.images.length < 1) {
    errors.images = "this feild is required";
  }
  return errors;
};

export default function ProductForm() {
    // const uploadMultipleFiles=(data)=> {
    //     console.log(data[0]);
    // }

  return (
    <div className={`${classes.backColor} container-fluid`}>
      <div
        className={`container shadow-lg p-0 row mt-5 ${classes.centerDiv} 
      ${classes.borderParent}`}
        style={{ height: "75vh", width: "53vw" }}
      >
        <div className={`col-5 d-none d-lg-block ${classes.bgImg}`}></div>
        <div
          className={`col-lg-7 container-fluid ${classes.backColors} col-12 ${classes.borderLeft} d-flex flex-column`}
        >
          <div
            className="fs-1 my-2 ms-1 "
            style={{
              fontFamily: " 'El Messiri', sans-serif",
            }}
          >
            Add Product
          </div>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
          >
            <Form>
              <Field
                className={`form-control mt-3 ms-2 ${classes.inputWidth}`}
                id="nameOfProduct"
                name="nameOfProduct"
                placeholder="Name Of Product"
              />
              <div className="mx-3 my-1 fw-light text-danger">
                <ErrorMessage name="nameOfProduct" />
              </div>
              <Field
                id="description"
                name="description"
                as="textarea"
                className={`form-control mt-3 ms-2  ${classes.inputWidth}`}
                placeholder="Description"
              />
              <div className="mx-3  fw-light text-danger">
                <ErrorMessage name="description" />
              </div>
              <Field
                id="price"
                name="price"
                className={`form-control mt-3 ms-2  ${classes.inputWidth}`}
                placeholder="Price"
                type="number"
              />
              <div className="mx-3  fw-light text-danger">
                <ErrorMessage name="price" />
              </div>
              <Field
                id="images"
                name="images"
                multiple
                // onChange={(event)=>uploadMultipleFiles(event.target.files)}
                className={`form-control mt-3 ms-2  ${classes.inputWidth}`}
                type="file"
                accept="image/*"
              />
              <div className="mx-3  fw-light text-danger">
								<ErrorMessage name="images" />
							</div>
              {/* <Field
                as="select"
                name="coverageArea"
                className={`form-select mt-3 ms-2  ${classes.inputWidth}`}
                value="0"
                aria-label="Default select example"
              >
                <option value="0">Select Coverage Area</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Field> */}

              <button
                type="submit"
                className="btn btn-outline-success ms-5 mx-2 mt-4"
              >
                Submit
              </button>
              <button className="btn btn-outline-light mx-2 mt-4">
                Cancel Changes
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
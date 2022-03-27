import React, { useEffect, useState } from "react";
import classes from "./product-form.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { axiosInstance } from "../../../network/axiosConfig";
import { loadActions } from "../../../store/LoadingSlice";
import { useDispatch } from "react-redux";
const initialValues = {
  name: "",
  description: "",
  price: 0,
  categoryId: "",
  image: [],
};

export default function ProductForm() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const fillSelectMenu = async () => {
    dispatch(loadActions.toggelLoader());
    const res = await axiosInstance.get(`seller/category/allCategories`);
    dispatch(loadActions.toggelLoader());
    const categories = res.data;
    initialValues.categoryId = categories._id;
    setCategories(categories);
  };
  useEffect(() => {
    fillSelectMenu();
  }, []);

  const [image, setImage] = useState("");
  const onSubmit = (values) => {
    let formData = new FormData();
    for (const img of image) {
      formData.append("image", img);
    }
    formData.append("price", values.price);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("categoryId", values.categoryId);
    console.log(typeof values.categoryId, "categoryId");
    (async () => {
      console.log("RESULT");
    dispatch(loadActions.toggelLoader());
      const res = await axiosInstance.post(
        "seller/product/addProduct",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    dispatch(loadActions.toggelLoader());
    console.log("teeeeeeeeest");
      console.log(res, "RESULT");
    })();
  };
  const validate = (values) => {
    let errors = {};

    if (values.name.length < 1) {
      errors.name = "this feild is required";
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
    if (values.categoryId == undefined) {
      errors.categoryId = "please select one of categories";
    }
    if (image.length === 0) {
      errors.image = "please insert minimum one picture";
    }
    if (image.length > 5) {
      errors.image = "the maximum for images is 5 pictures";
    }
    for (let img of image) {
      if (img.size > 100000) {
        errors.image = "the maximum size for every image is 100 Kb";
      }
    }
    return errors;
  };

  const handelFileInputChange = (files) => {
    console.log(files[0], "file");
    setImage(files);
  };
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
                id="name"
                name="name"
                placeholder="Name Of Product"
              />
              <div className="mx-3 my-1 fw-light text-danger">
                <ErrorMessage name="name" />
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
                placeholder="price"
                type="number"
              />
              <div className="mx-3  fw-light text-danger">
                <ErrorMessage name="price" />
              </div>
              <input
                id="image"
                name="image"
                multiple
                onChange={(event) => handelFileInputChange(event.target.files)}
                className={`form-control mt-3 ms-2  ${classes.inputWidth}`}
                type="file"
                accept="image/*"
              />
              <div className="mx-3  fw-light text-danger">
                <ErrorMessage name="image" />
              </div>
              <Field
                as="select"
                name="categoryId"
                className={`form-select mt-3 ms-2  ${classes.inputWidth}`}
                aria-label="Default select example"
              >
                <option value="0">Select Category</option>
                {categories.map((category) => (
                  <option key={category?._id} value={category?._id}>
                    {category?.name}
                  </option>
                ))}
              </Field>
              <div className="mx-3  fw-light text-danger">
                <ErrorMessage name="categoryId" />
              </div>
              <button
                type="submit"
                className="btn btn-outline-success ms-5 mx-2 mt-4"
              >
                Submit
              </button>
              {/* <button className="btn btn-outline-light mx-2 mt-4">
                Cancel Changes
              </button> */}
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

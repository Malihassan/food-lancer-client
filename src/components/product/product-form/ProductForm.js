import React, { useCallback, useEffect, useState } from "react";
import Dropzone from "react-dropzone";
import { useDropzone } from "react-dropzone";
import classes from "./product-form.module.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { axiosInstance } from "../../../network/axiosConfig";
import { loadActions } from "../../../store/LoadingSlice";
import { useDispatch } from "react-redux";
import { RiFolderOpenFill } from "react-icons/ri";
import { isRejected } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

const initialValues = {
  name: "",
  description: "",
  price: 0,
  categoryId: "",
  image: [],
};

export default function ProductForm() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles, "acceptedFiles");
  }, []);
  const { getInputProps, getRootProps } = useDropzone({ onDrop });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const { sendRequest,hasError } = useFetch();
  const fillSelectMenu = async () => {
    // dispatch(loadActions.toggelLoader());
    // const res = await axiosInstance.get(`seller/category/allCategories`);
    // dispatch(loadActions.toggelLoader());
    // const categories = res.data;
    // initialValues.categoryId = categories._id;
    // setCategories(categories);
    sendRequest(
      {
        url: `seller/category/allCategories`,
        method: "GET",
      },
      (res) => {
        if (res.status === 200) {
          const categories = res.data;
          initialValues.categoryId = categories._id;
          setCategories(categories);
        }
      }
    );
  };
  useEffect(() => {
    fillSelectMenu();
  }, []);

  const [image, setImage] = useState([]);
  const onSubmit = (values) => {
    console.log("tessssssst");
    let formData = new FormData();
    console.log(image.length, "length");
    for (const img of image) {
      formData.append("image", img);
    }
    formData.append("price", values.price);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("categoryId", values.categoryId);
    console.log(formData, "Form Data");
    console.log(typeof values.categoryId, "categoryId");
    (async () => {
      // console.log("RESULT");
      // dispatch(loadActions.toggelLoader());
      // const res = await axiosInstance.post(
      //   "seller/product/addProduct",
      //   formData,
      //   { headers: { "Content-Type": "multipart/form-data" } }
      // );
      // dispatch(loadActions.toggelLoader());
      // navigate("/myProducts");
      sendRequest(
        { url: "seller/product/addProduct", method: "POST" ,body:formData},
        (res) => {
          if (res.status === 200) {
            console.log(res);
            navigate("/myProducts");
          }
        }
      );
    })();
  };
  const validate = (values) => {
    let errors = {};
    if (values.name.length < 1) {
      errors.name = "this feild is required";
    }
    if (values.name.length > 25) {
      errors.name = "this maximum length is 25 letter";
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
    if (values.categoryId === undefined) {
      errors.categoryId = "please select one of categories";
    }
    if (image.length === 0) {
      errors.image = "please insert minimum one picture";
    }
    if (image.length > 5) {
      errors.image = "the maximum for images is 5 pictures";
    }
    for (let img of image) {
      if (img.size > 1000000) {
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
    <div className={`${classes.backColor} container-fluid  py-3`}>
      <div
        className={`col-lg-7 shadow mx-auto container-fluid ${classes.backColors} col-md-10 ${classes.borderLeft} d-flex flex-column `}
      >
        <div
          className="fs-1 mt-2 ms-1 text-center"
          style={{
            fontFamily: "'El Messiri', sans-serif",
          }}
        >
          Add Product
        </div>
        <hr className="mb-2" />
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={onSubmit}
        >
          <Form className="">
            <Field
              className={`form-control mt-4  ${classes.inputWidth}`}
              id="name"
              name="name"
              placeholder="Product Name"
            />
            <div className={`my-1 fw-light ${classes.textWarning} text-center`}>
              <ErrorMessage name="name" />
            </div>
            {hasError?.error && (
              <div className="form-text text-warning text-center">{hasError?.error}</div>
            )}
            <Field
              id="description"
              name="description"
              as="textarea"
              className={`form-control mt-4 ${classes.inputWidth}`}
              placeholder="Description"
            />
            <div className={`my-1 fw-light ${classes.textWarning} text-center`}>
              <ErrorMessage name="description" />
            </div>
            <Field
              id="price"
              name="price"
              className={`form-control mt-4 ${classes.inputWidth}`}
              placeholder="price"
              type="number"
            />
            <div className={`my-1 fw-light ${classes.textWarning} text-center`}>
              <ErrorMessage name="price" />
            </div>
            <Field
              as="select"
              name="categoryId"
              className={`form-select mt-4  ${classes.inputWidth}`}
              aria-label="Default select example"
            >
              <option className={`${classes.option}`} value="0">
                Select Category
              </option>
              {categories.map((category) => (
                <option
                  className={`${classes.option}`}
                  key={category?._id}
                  value={category?._id}
                >
                  {category?.name}
                </option>
              ))}
            </Field>
            <div className={`my-1 fw-light ${classes.textWarning} text-center`}>
              <ErrorMessage name="categoryId" />
            </div>
            {/* <input
              id="image"
              name="image"
              multiple
              onChange={(event) => handelFileInputChange(event.target.files)}
              className={`form-control mt-4 ${classes.inputWidth}`}
              type="file"
              accept="image/*"
            /> */}
            {/* <div className="fw-light text-danger">
              <ErrorMessage name="image" />
            </div> */}
            <p className="text-center h5 pt-3">Image Upload</p>
            <hr className="mb-4" />
            <div className={`${classes.dropZone} mx-5 py-2`}>
              <Dropzone
                name="image"
                id="image"
                accept="image/*"
                onDrop={(acceptedFiles) => {
                  console.log(acceptedFiles[0].path, "Files");
                  setImage(acceptedFiles);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <RiFolderOpenFill className="text-warning  fs-1 mt-3" />
                      <p>Drag & Drop Files Here</p>
                      <div className="row col-7 m-auto ">
                        {image.map((img) => {
                          return (
                            <small
                              key={image.indexOf(img)}
                              className="col-12 text-center"
                            >
                              {image.indexOf(img) + 1} - {img.name} - size :{" "}
                              {img.size}
                            </small>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
            <div className={`my-1 fw-light ${classes.textWarning} text-center`}>
              <ErrorMessage name="image" />
            </div>
           
            <div className="d-flex justify-content-center mt-4 mb-4">
              <button type="submit" className={`btn ${classes.btnSubmit} `}>
                Create New Product
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../shared/product-card/Product-Card";
import { getProducts } from "../../../store/ProductSlice";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import classes from "./product-list.module.scss";
import { Link } from "react-router-dom";
import Empty from "../../shared/emptyData/Empty";

export default function ProductList() {
  const [page, setPage] = useState(1);
  const isDeleted = useSelector((state) => state.product.isDeleted);
  const handelPageClick = (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };
  const loading = useSelector((state) => state.loader.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts(page));
  }, [page]);
  useEffect(() => {
    dispatch(getProducts(page));
  }, [isDeleted]);
  const products = useSelector((state) => state.product.products);
  const pageCount = useSelector((state) => state.product.pageCount);
  const totoalDocs = useSelector((state) => state.product.totoalDocs);
  return (
    <div className={`container-fluid ${classes.bgColor} `}>
      <Link to="addProduct" className={`btn ${classes.addBtn}  my-2`}>
        Add Product
      </Link>
      <div className="container">
      {products.length === 0 && <Empty />}
      {products.length !== 0 && (
        <div className={`row justify-content-lg-start justify-content-md-center justify-content-sm-center`}>
          {products.map((prd) => {
            return (
              <div
                key={prd._id}
                className={`card col-lg-4 col-md-6 col-sm-8 py-3  ${classes.cardPrd} `}
              >
                <ProductCard product={prd} />
              </div>
            );
          })}
        </div>
      )}
      {products.length !== 0 && (
        <div className="row justify-content-around">
          <h5 className="col-2 text-dark">
            Totoal &nbsp; &nbsp;&nbsp;&nbsp;{totoalDocs}
          </h5>
          <div className="col-5">
            <ReactPaginate
              previousLabel={<FontAwesomeIcon icon={faCircleArrowLeft} />}
              nextLabel={<FontAwesomeIcon icon={faCircleArrowRight} />}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handelPageClick}
              containerClassName={"pagination justify-content-center"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={`${classes.active1}`}
              
            />
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

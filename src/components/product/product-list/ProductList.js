import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../shared/product-card/Product-Card";
import { getProducts } from "../../../store/ProductSlice";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadActions } from "../../../store/LoadingSlice";

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
    dispatch(loadActions.toggelLoader());
    dispatch(getProducts(page));
    dispatch(loadActions.toggelLoader());
  }, [page, isDeleted]);

  const products = useSelector((state) => state.product.products);
  const pageCount = useSelector((state) => state.product.pageCount);
  //const totoalDocs = useSelector((state) => state.product.totoalDocs);
  return (
    <div className={`container-fluid ${classes.bgColor} `}>
     <div className="d-flex justify-content-end">
     <Link to="addProduct" className={`btn ${classes.addBtn}  my-2`}>
        Add Product
      </Link>
     </div>
      <div className="container">
      {products.length === 0 && <Empty />}
      {products.length !== 0 && (
        <div className={`row justify-content-lg-start justify-content-md-center justify-content-sm-center `}>
          {products.map((prd) => {
            return (
              <div
                key={prd._id}
                className={`card col-lg-4 col-md-6 col-sm-8 col-xs-8 py-3  ${classes.cardPrd} `}
              >
                <ProductCard product={prd} />
              </div>
            );
          })}
        </div>
      )}
      {products.length !== 0 && (
        
            <ReactPaginate
              previousLabel={<FontAwesomeIcon icon={faCircleArrowLeft} />}
              nextLabel={<FontAwesomeIcon icon={faCircleArrowRight} />}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handelPageClick}
              containerClassName={`${classes.paginationContainer} pagination justify-content-center`}
              pageClassName={"page-item px-2 py-1"}
              pageLinkClassName={`page-link ${classes.pageLink}`}
              previousClassName={`page-item `}
              previousLinkClassName={`page-link ${classes.pageItem}`}
              nextClassName={"page-item"}
              nextLinkClassName={`page-link ${classes.pageItem}`}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
              activeClassName={`${classes.active1}`}
            />
          
        
      )}
      </div>
    </div>
  );
}

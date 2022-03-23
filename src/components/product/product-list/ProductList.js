import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../shared/product-card/Product-Card";
import {getProducts} from '../../../store/ProductSlice';
import ReactPaginate from "react-paginate";

import "./product-list.scss";

export default function ProductList() {
  const [page, setPage] = useState(1);
  const handelPageClick = (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getProducts(page));
  },[page])
  const products=useSelector((state)=>state.product.products);
  const pageCount=useSelector((state)=>state.product.pageCount);
  const totoalDocs=useSelector((state)=>state.product.totoalDocs);
  return (
    <div className="container-fluid">
      <div className="row bg-transparent">
          {products.map((prd) => {
              return(
                  <div key={prd._id} className="card col-lg-4 col-md-6 col-12 py-3 ">
              <ProductCard product={prd} />
        </div>
              )
          })}
      </div>
      <div className="row justify-content-around">
          <h5 className="col-2">Totoal &nbsp; &nbsp;&nbsp;&nbsp;{totoalDocs}</h5>
        <div className="col-5">
      <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
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
          activeClassName={"active"}
        />
        </div>
        </div>
    </div>
  );
}

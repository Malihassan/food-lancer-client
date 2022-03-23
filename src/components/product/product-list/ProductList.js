import React from "react";
import ProductCard from "../../shared/product-card/Product-Card";
import "./product-list.scss";

export default function ProductList() {
  const arr = [1,13,5,7,8];
  return (
    <div className="container-fluid">
      <div className="row bg-transparent">
          {arr.map((res) => {
              return(
                  <div key={arr.indexOf(res)} className="card col-lg-4 col-md-6 col-12 py-3 ">
              <ProductCard />
        </div>
              )
          })}
      </div>
    </div>
  );
}

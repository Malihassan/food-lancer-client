import { useState } from "react";
import "./pagination.scss";
function Pagination(props) {
  let item = (
    <li key={props.currentPage} className={`page-item active`}>
      <a className="page-link">{props.currentPage}</a>
    </li>
  );
  return (
    <nav className="py-2 d-flex justify-content-center paginationContainer">
      <ul className="pagination">
        {props.currentPage > 1 && (
          <li
            className={`page-item`}
            onClick={() => {
              props.onPreviousChange();
            }}
          >
            <span className="page-link">Previous</span>
          </li>
        )}
        {item}
        {props.currentPage < props.lengthPage - 1 && (
          <li
            className={`page-item ${props.currentPage > 5 ? "active" : ""}`}
            onClick={() => {
              props.onNextChange();
            }}
          >
            <a className="page-link">Next</a>
          </li>
        )}
      </ul>
    </nav>
  );
}
export default Pagination;

import { useState } from "react";
import OffCanvas from "../../shared/OffCanvas";
import {IoFilterOutline}  from 'react-icons/io5'
function OrderFilter(props) {
  const [toggleCanvas, setToggleCanvas] = useState(false);
  const toggleCanvasHandler = () => {
    setToggleCanvas(!toggleCanvas);
  };

  return (
    <>
      <div className="container d-flex justify-content-end">
        <button
          className="btn mt-2 px-4" style={{backgroundColor:"#091b29",color:'#f8f8f7'}}
          onClick={toggleCanvasHandler}
          type="button"
        >
          <IoFilterOutline className="me-3" style={{color:"#f8f8f7" ,fontSize:"25px"}}/>
          Filter
        </button>
      </div>
      <OffCanvas
        toggleCanvas={toggleCanvas}
        toggleCanvasHandler={toggleCanvasHandler}
        placement={"end"}
        name={"Filter Order"}
        title="Filter Order"
      >
        <div className="mt-3">
          <h4 className="title mt-2" style={{ color: "black" }}>
            Status
          </h4>
          <div className="list-group">
            <label className="list-group-item border-0">
              <input
                className="form-check-input me-1"
                checked={props.checkboxSelected["in progress"]}
                onChange={props.sellerFilterSelection}
                type="checkbox"
                value="in progress"
              />
              In Progress
            </label>
            <label className="list-group-item border-0">
              <input
                className="form-check-input me-1"
                checked={props.checkboxSelected.delivered}
                onChange={props.sellerFilterSelection}
                type="checkbox"
                value="delivered"
              />
              Delivered
            </label>
            <label className="list-group-item border-0">
              <input
                className="form-check-input me-1"
                checked={props.checkboxSelected.canceled}
                onChange={props.sellerFilterSelection}
                type="checkbox"
                value="canceled"
              />
              Canceled
            </label>
          </div>
        </div>
      </OffCanvas>
    </>
  );
}
export default OrderFilter;

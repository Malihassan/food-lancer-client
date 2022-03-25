import { useState } from "react";
import { Offcanvas } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { orderActions } from "../../store/orderSlice";
function OffCanvas({ name, ...props }) {
  const dispatch = useDispatch();
  const showDetailsOrder = useSelector((state) => state.order.showDetailsOrder);
  const handleClose = () => {
    dispatch(orderActions.toggleDetailsOrder());
  };
  return (
    <>
      <Offcanvas
        className={`${props.className}`}
        show={showDetailsOrder}
        onHide={handleClose}
        {...props}
      >
        <Offcanvas.Header closeButton className="border">
          <Offcanvas.Title className="col-12 d-flex justify-content-between">
            {props.title}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>{props.children}</Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

//   function Example() {
//     return (
//       <>
//         {['start', 'end', 'top', 'bottom'].map((placement, idx) => (
//           <OffCanvasExample key={idx} placement={placement} name={placement} />
//         ))}
//       </>
//     );
//   }

//   render(<Example />);

export default OffCanvas;

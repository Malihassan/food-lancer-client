import { Offcanvas } from "react-bootstrap";
function OffCanvas({ name, ...props }) {
  const handleClose = () => {
    props.toggleCanvasHandler()
  };
  return (
    <>
      <Offcanvas
        className={`${props.className}`}
        show={props.toggleCanvas}
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

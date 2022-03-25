
export default function OrderDetails(props) {
  return (
    <div>
      <div className="row flex-wrap py-2 justify-content-around mx-0">
        <div className="col-3 ps-0">
          <img src={props.order._id.image[0].url} className="round-img img-fluid rounded-circle" />
        </div>
        <div className="col-9 d-flex pe-0 flex-column">
          <h6 className="fw-bold">{props.order._id.name}</h6>
          <small className="pb-2 card-text text-secondary">
            {props.order._id.description}
          </small>

          <div className="d-flex justify-content-between">
            <small className="fw-bold">EGP {props.order._id.price}</small>
            <small className="fw-bold">{props.order.quantity} Items</small>
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
}

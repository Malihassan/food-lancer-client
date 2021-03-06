import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../../hooks/useFetch";
import ListOrderDetails from "../listOrderDetails/OrderDetails";
import { IoLocation } from "react-icons/io5";
import { authActions } from "../../../store/AuthSlice";
export default function OrderDetails(props) {
  const { sendRequest } = useFetch();
  const dispatch = useDispatch();
  const selectedOrderProducts = useSelector(
    (state) => state.order.selectedOrderProducts
  );
  const totalPrice = useSelector((state) => state.order.totalPrice);
  let createdAt = useSelector((state) => state.order.createdAt);
  let address = useSelector((state) => state.order.address);
  const notification = useSelector((state) => state.auth.sellerNotification);
  createdAt = new Date(createdAt);
  let status = useSelector((state) => state.order.status);
  const orderId = useSelector((state) => state.order.orderId);


  const changeOrderStatus = (status) => {
    sendRequest(
      {
        url: `seller/order/status`,
        method: "PATCH",
        body: { status, orderId },
      },
      () => {}
    );

    props.toggleCanvasHandler();
    props.changeStateOrderStatus();
    dispatch(authActions.setOrderAsReadInNotification(orderId));

  };
  return (
    <div className="card-body d-flex flex-column justify-content-between">
      <small className="fw-bold mb-3">
        {createdAt.toLocaleDateString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </small>
      <small className="fw-bold  mb-3">
        <IoLocation className="fs-5 me-2" /> {address}
      </small>
      {selectedOrderProducts.map((item, index) => (
        <ListOrderDetails key={index} order={item} />
      ))}
      <div className={`col-12 d-flex justify-content-between`}>
        <h4>Total</h4>
        <h4>EGP {totalPrice.toFixed(2)}</h4>
      </div>
      {status === "pending" && (
        <div className="d-flex justify-content-end my-3">
          <div
            className="btn-group"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => changeOrderStatus("canceled")}
            >
              Rejected
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => changeOrderStatus("accepted")}
            >
              Accepted
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

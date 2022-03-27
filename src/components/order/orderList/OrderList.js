import classes from "./orderList.module.scss";
import img from "../../../assets/imgs/landing page/cheif.png";
import { useDispatch } from "react-redux";
import { orderActions } from "../../../store/orderSlice";

function OrderList(props) {
  const dispatch = useDispatch();
  return (
    <section className={`container mt-3 py-3 shadow `}>
      <h4>Order List</h4>
      <table className={`table table-responsive w-100 d-block d-sm-table ${classes.Ordertable}`}>
        <thead>
          <tr>
            <th scope="col">Buyer</th>
            <th scope="col">Address</th>
            <th scope="col">Items</th>
            <th scope="col">Price</th>
            <th scope="col">status</th>
          </tr>
        </thead>
        <tbody className="border-0 border-top">
          {props.listOfOrders.map((order) => (
            <tr
              key={order._id}
              onClick={() => {
                dispatch(
                  orderActions.toggleDetailsOrder([{
                    products: order.products,
                    totalPrice: order.totalPrice,
                    createdAt: order.createdAt,
                    status:order.status
                  }])
                );
              }}
            >
              <td className="col d-flex">
                <img className={` h-100 w-h-even d-none d-sm-block rounded-circle`} src={img} />
                <label>
                  {order.buyerId.firstName} {order.buyerId.lastName}
                </label>
              </td>
              <td className="col">
                <label>{order.buyerId.address}</label>
              </td>
              <td className="col">
                <label>x{order.products.length}</label>
              </td>
              <td className="col">
                <label>EGP {order.totalPrice}</label>
              </td>
              <td className="col">
                {order.status == "in progress" && (
                  <span className={`badge mt-1 py-2 bg-primary`}>
                    In Progress
                  </span>
                )}
                {order.status == "canceled" && (
                  <span className={`badge mt-1 py-2 bg-warning`}>Canceled</span>
                )}
                {order.status == "delivered" && (
                  <span className={`badge mt-1 py-2 bg-success`}>
                    Delivered
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default OrderList;

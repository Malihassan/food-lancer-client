import classes from "./orderList.module.scss";
import img from "../../../assets/imgs/landing page/cheif.png";
import { useDispatch } from "react-redux";
import { orderActions } from "../../../store/orderSlice";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function OrderList(props) {
  const dispatch = useDispatch();
  const selectedProductHandler = (order) => {
    props.toggleCanvasHandler();
    dispatch(
      orderActions.toggleDetailsOrder({
        _id: order._id,
        products: order.products,
        totalPrice: order.totalPrice,
        createdAt: order.createdAt,
        status: order.status,
      })
    );
  };
  return (
    <section className={`container mt-3 mb-5 py-3 shadow `}>
      <h4 style={{ color: "black" }}>Order List</h4>
      <table
        className={`table table-responsive w-100  d-sm-table ${classes.Ordertable}`}
      >
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
            <tr key={order._id} onClick={() => selectedProductHandler(order)}>
              <td className="col d-flex">
                <img
                  className={` h-100 w-h-even d-none d-sm-block rounded-circle`}
                  src={img}
                />
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
                  <span className={`badge mt-1 py-2 bg-dark`}>Canceled</span>
                )}
                {order.status == "delivered" && (
                  <span className={`badge mt-1 py-2 bg-success`}>
                    Delivered
                  </span>
                )}
                {order.status == "pending" && (
                  <span className={`badge mt-1 py-2 bg-warning`}>Pending</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={<FontAwesomeIcon icon={faCircleArrowLeft} />}
        nextLabel={<FontAwesomeIcon icon={faCircleArrowRight} />}
        breakLabel={"..."}
        pageCount={props.totalPages}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={props.onPageChange}
        containerClassName={`${classes.paginationContainer} pagination justify-content-center`}
        pageClassName={`page-item px-2 py-1`}
        pageLinkClassName={`page-link ${classes.pageLink}`}
        previousClassName={"page-item"}
        previousLinkClassName={`page-link ${classes.pageItem}`}
        nextClassName={"page-item"}
        nextLinkClassName={`page-link ${classes.pageItem}`}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={`${classes.active}`}
      />
    </section>
  );
}
export default OrderList;

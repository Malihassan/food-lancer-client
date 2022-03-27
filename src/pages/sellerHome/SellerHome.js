import { useEffect, useState } from "react";
import OrderList from "../../components/order/orderList/OrderList";
import SellerInfo from "../../components/order/odrerSellerInfo/SellerInfo";
import { axiosInstance } from "../../network/axiosConfig";
import OffCanvas from "../../components/shared/OffCanvas";
import classes from "./sellerHome.module.scss";
import { useSelector } from "react-redux";
import OrderDetails from "../../components/order/orderDetails/OrderDetails";
function SellerHome(params) {
	const selectedOrderProducts = useSelector(
		(state) => state.order.selectedOrderProducts
	);
	const totalPrice = useSelector((state) => state.order.totalPrice);
	let createdAt = useSelector((state) => state.order.createdAt);
	let status = useSelector((state) => state.order.status);
	const [listOfOrders, setListOfOrders] = useState([]);
	useEffect(async () => {
		let res = await axiosInstance.get("seller/order/myOrders");
		setListOfOrders(res.data);
	}, []);
	createdAt = new Date(createdAt);
	return (
		<>
			<SellerInfo />
			<section>
				<OrderList listOfOrders={listOfOrders} />
				<OffCanvas
					className={classes.OffCanvas}
					placement={"end"}
					name={"end"}
					title="Details Order"
				>
					<div className="card-body d-flex flex-column justify-content-between">
						<small className="fw-bold mb-3">
							{createdAt.toLocaleDateString(undefined, {
								weekday: "long",
								year: "numeric",
								month: "long",
								day: "numeric",
							})}
						</small>
						{selectedOrderProducts.map((item, index) => (
							<OrderDetails key={index} order={item} />
						))}
						<div className={`col-12 d-flex justify-content-between`}>
							<h4>Total</h4>
							<h4>EGP {totalPrice.toFixed(2)}</h4>
						</div>
						{status == "in progress" && (
							<div className="d-flex justify-content-end my-3">
								<div
									class="btn-group"
									role="group"
									aria-label="Basic mixed styles example"
								>
									<button type="button" class="btn btn-danger">
										Rejected
									</button>
									<button type="button" class="btn btn-success">
										Accepted
									</button>
								</div>
							</div>
						)}
					</div>
				</OffCanvas>
			</section>
		</>
	);
}
export default SellerHome;

import { useEffect, useState } from "react";
import OrderList from "../../components/order/orderList/OrderList";
import SellerInfo from "../../components/order/odrerSellerInfo/SellerInfo";
import { axiosInstance } from "../../network/axiosConfig";
import OffCanvas from "../../components/shared/OffCanvas";
import classes from "./sellerHome.module.scss";
import { useSelector } from "react-redux";
import OrderDetails from "../../components/order/orderDetails/OrderDetails";
import OrderFilter from "../../components/order/orderFilter/OrderFilter";
import Empty from "../../components/shared/emptyData/Empty";
function SellerHome(params) {
  const selectedOrderProducts = useSelector(
    (state) => state.order.selectedOrderProducts
  );
  const totalPrice = useSelector((state) => state.order.totalPrice);
  let createdAt = useSelector((state) => state.order.createdAt);
  createdAt = new Date(createdAt);
  let status = useSelector((state) => state.order.status);

  const [toggleCanvas, setToggleCanvas] = useState(false);
  const toggleCanvasHandler = () => {
    setToggleCanvas(!toggleCanvas);
  };
  const [userInfo, setUserInfo] = useState({
    img:'',
    name:"",
    coverageArea: "",
    status: "",
    rate: "",
    countDeliverOrder: 0,
    inprogressDeliver: 0,
  });
  const [listOfOrders, setListOfOrders] = useState([]);
  //for pagination
  const [page, setPage] = useState(1);
  const [paginateData, setPaginateData] = useState({
    totalPages: "",
    totalDocs: "",
  });
  const onPageChange = (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };
  const [checkboxSelected, setCheckboxSelected] = useState({
    "in progress": false,
    delivered: false,
    canceled: false,
  });
  let orderStatus = [];
  for (const [key, value] of Object.entries(checkboxSelected)) {
    if (value) {
      orderStatus.push(key);
    }
  }
  const sellerFilterSelection = (e) => {
    let type = e.target.value;
    checkboxSelected[type] = !checkboxSelected[type];
    setCheckboxSelected({ ...checkboxSelected });
  };
  useEffect(async () => {
    let api_getOrders_Promise = axiosInstance.get("seller/order/myOrders", {
      params: { page, orderStatus },
    });
    let api_getSeller_info = axiosInstance.get("seller/account/info")
   const res= await Promise.all([api_getOrders_Promise,api_getSeller_info])
   console.log(res);
    // let res = await axiosInstance.get("seller/order/myOrders", {
    //   params: { page, orderStatus },
    // });
    // console.log(res);
    setUserInfo({
      img:'',
      name:res[1].data.seller.firstName+' '+res[1].data.seller.lastName,
      coverageArea:
        res[1].data.seller.coverageArea.governorateName +
        "," +
        res[1].data.seller.coverageArea.regionName,
      status: res[1].data.seller.status,
      rate: res[1].data.seller.rate,
      countDeliverOrder: res[1].data.countDeliverOrder,
      inprogressDeliver: res[1].data.countInprogressOrder,
    });
    setPaginateData({
      totalPages: res[0].data.totalPages,
      totalDocs: res[0].data.totalDocs,
    });
    setListOfOrders(res[0].data.docs);
  }, [page, checkboxSelected]);
  return (
    <>
      <SellerInfo userInfo={userInfo} />
      {listOfOrders.length != 0 && <section>
        <OrderFilter
          checkboxSelected={checkboxSelected}
          sellerFilterSelection={sellerFilterSelection}
        />
        <OrderList
          toggleCanvasHandler={toggleCanvasHandler}
          listOfOrders={listOfOrders}
          totalDocs={paginateData.totalDocs}
          totalPages={paginateData.totalPages}
          onPageChange={onPageChange}
        />
        <OffCanvas
          className={classes.OffCanvas}
          placement={"end"}
          name={"end"}
          title="Details Order"
          toggleCanvas={toggleCanvas}
          toggleCanvasHandler={toggleCanvasHandler}
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
      </section>}
      {listOfOrders.length == 0 && <Empty message="Not Order Yet"/>}
    </>
  );
}
export default SellerHome;

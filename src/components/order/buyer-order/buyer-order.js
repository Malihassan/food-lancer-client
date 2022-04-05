import { useSelector, useDispatch } from "react-redux";
import { orderActions } from "../../../store/orderSlice";
import { useEffect, useState } from "react";
import StarRatings from 'react-star-ratings';
import "./buyer-order.scss";
import useFetch from "../../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";


function BuyerOrder(){
    const { sendRequest } = useFetch();
    const orderCards = useSelector((state) => state.order);
    const [sortedOrders, setSortedOrders] = useState({});
    const [sellerOrderPrice, setSellerOrderPrice] = useState({});
    const [buyerData, setBuyerData] = useState({});
    const [orderResponse, setOrderResponse] = useState({})
    const dispatch = useDispatch();
    async function buyerDataHandler(res) {
        if (res.status === 200) {
          console.log(res);
          setBuyerData(res.data);
        }
      }

    useEffect(()=>{

        sendRequest(
            {
              method: "GET",
              url: `buyer/account/info`,
            },
            buyerDataHandler
        );

    }, [])

    useEffect(()=>{

        sortSellerOrders();

    },[sortedOrders]);

    // useEffect(()=>{
    //     console.log(sortedOrders);
    //     console.log(sellerIds);

    // },[sortedOrders]);

    const sortSellerOrders = () => {

        if(orderCards.selectedOrderProducts){
            for(let product of orderCards.selectedOrderProducts){

                let seller = sortedOrders[product.sellerId._id]? true : false;
    
                let sellerProduct = seller && 
                sortedOrders[product.sellerId._id].find((item) => item._id === product._id)?
                sortedOrders[product.sellerId._id].find((item) => item._id === product._id)
                : null;
    
                if(!seller){
                    setSortedOrders({
                        ...sortedOrders,
                        [product.sellerId._id]: [product]
                    })
                    setSellerOrderPrice({
                        [product.sellerId._id]: product.price * product.serves
                    })
                } else if(seller && !sellerProduct){
                    setSortedOrders({
                        ...sortedOrders,
                        [product.sellerId._id]: [...sortedOrders[product.sellerId._id], product]
                    })
                    setSellerOrderPrice({
                        [product.sellerId._id]: sellerOrderPrice[product.sellerId._id] + product.price * product.serves
                    })
                }
    
                console.log(sortedOrders);
            }
        }
    }

    const removeOrder = async (sellerProducts, seller) => {
        let orderList = [...orderCards.selectedOrderProducts]
        for(let product of sellerProducts){
            orderList = orderList.filter((item) => item._id !== product._id);
        }

        await dispatch(orderActions.setCartItem({...orderCards, product: orderList}));

        const filteredOrders = Object.keys(sortedOrders)
            .filter(key => !key.includes(seller))
            .reduce((obj, key) => {
                obj[key] = sortedOrders[key];
                return obj;
        }, {});

        setSortedOrders(filteredOrders);
    }

    const postOrder = (orderProducts, sellerId) => {
        let products = [];

        orderProducts.forEach((product)=>{
            products.push({
                _id: product._id,
                quantity: product.serves
            })
        })

        sendRequest({
            method: "POST",
            url: `buyer/order/add`,
            body: {
                sellerId,
                buyerId: buyerData._id,
                address: buyerData.address,
                products,
                totalPrice: sellerOrderPrice[sellerId]
            }
        }, orderHandler)
    }

    const orderHandler = async (res) => {
        if (res.status === 200) {
            console.log(res);
            setOrderResponse(res.data);
            console.log(orderResponse)
        }
    }

    return (
        <div className="p-4">
            {orderResponse === "Order Submitted Successfully!" && 
            <div className="alert alert-success" role="alert">
                A simple success alert—check it out!
            </div>}
            {Object.keys(sortedOrders).map((seller, idx)=>{
                return(
                    <div className="card d-flex flex-column text-font p-3" key={idx}>
                        <button onClick={()=> removeOrder(sortedOrders[seller], seller)} className="btn btn-outline-danger w-2-5 align-self-end text-center d-flex"><FontAwesomeIcon className="Xmark-font align-self-center" icon={faXmark} /></button>
                        <div className="card-body d-flex justify-content-between">
                            <div className="card col-6">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <ul className="list-group list-group-flush">
                                            {sortedOrders[seller].map((product)=>{
                                                return(
                                                    <li className="list-group-item d-flex justify-content-between" key={product._id}>
                                                        <div className="d-flex col-10">
                                                            <img src={`${product.image[0].url}`} className="w-25 img-thumbnail me-3"/>
                                                            <div className="align-self-center">
                                                                <div className="mb-1 fw-bold">{product.name}</div>
                                                                <div className="small"><span className="badge bg-warning text-light">{product.categoryId.name}</span></div>
                                                                <StarRatings starDimension="0.8rem" starSpacing="0.025rem" rating={product.avgRate} starRatedColor="orange"/>
                                                            </div>
                                                        </div>
                                                        <div className="align-self-center col-2">
                                                            <div className="smaller mb-1">Price: {product.price}&#163;</div>
                                                            <div className="smaller mb-2">x{product.serves}</div>
                                                            <div className="fw-bold text-info">Total: {product.price * product.serves}&#163;</div>
                                                        </div>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                    <li className="list-group-item">
                                        <div className="fw-light">
                                            <p className="h5 mb-3">Buyer Details</p>
                                            <div>Buyer: {buyerData.firstName} {buyerData.lastName}</div>
                                            <div>Address: {buyerData.address}</div>
                                            <div>Phone Number: {buyerData.phone}</div>
                                        </div>
                                    </li>
                                    {/* <li className="list-group-item"></li> */}
                                </ul>
                            </div>
                            <div className="card col-5">
                                <ul className="list-group list-group-flush p-1">
                                    <li className="list-group-item my-2">
                                        <p className="h4 mb-4">Products</p>
                                        {sortedOrders[seller].map((product, idx)=>{
                                            return(
                                                <div className="d-flex fw-light justify-content-between" key={idx}>
                                                    <div className="col-6">
                                                        <div className="me-2">{product.name}</div>
                                                        
                                                    </div>
                                                    <div className="col-5">x{product.serves}</div>
                                                    <div className="col-1 text-end">{product.price* product.serves}&#163;</div>
                                                </div>
                                            )
                                        })}
                                    </li>
                                    <li className="list-group-item fw-light my-2">
                                        <div className="d-flex justify-content-between">
                                            <div>Price</div>
                                            <div >{sellerOrderPrice[seller]}&#163;</div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div>Discount</div>
                                            <div >0&#163;</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item d-flex flex-column">
                                        <div className="text-success d-flex justify-content-between">
                                            <div className="h5">Total</div>
                                            <div className="display-6 mb-4">{sellerOrderPrice[seller]}&#163;</div>
                                        </div>
                                        <button onClick={()=> postOrder(sortedOrders[seller], seller)} className="btn btn-dark w-100 rounded-0 align-self-bottom">Place Order</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default BuyerOrder
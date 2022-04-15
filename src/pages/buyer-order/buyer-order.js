import { useSelector, useDispatch } from "react-redux";
import { cartItemsActions } from "../../store/BuyerOrderSlice";
import { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import "./buyer-order.scss";
import useFetch from "../../hooks/useFetch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function BuyerOrder() {
	const { sendRequest } = useFetch();
	const orderCards = useSelector((state) => state.cartItems);
	const [buyerData, setBuyerData] = useState({});
	const [orderResponse, setOrderResponse] = useState(false);
	const dispatch = useDispatch();
    const [address, setAddress] = useState({});
    const [addressErr, setAddressErr] = useState({});
    async function buyerDataHandler(res) {
        if (res.status === 200) {
          console.log(res);
          setBuyerData(res.data);
        }
    }

	useEffect(() => {
		sendRequest(
			{
				method: "GET",
				url: `buyer/account/info`,
			},
			buyerDataHandler
		);
	}, []);

	const checkAddress = (e, index) => {
        setAddress({
            ...address,
            [index]: e.target.value
        });

        if (e.target.value.length === 0){
            setAddressErr({
                ...addressErr,
                [index]: "this field is required"
            })
        } else if (e.target.value.length < 5) {
            setAddressErr({
                ...addressErr,
                [index]: "address can't be less than 5 characters"
            })
        } else if (e.target.value.length > 40){
            setAddressErr({
                ...addressErr,
                [index]: "address can't be more than 40 characters"
            })
        } else {
            setAddressErr({
                ...addressErr,
                [index]: ""
            })
        }
    }

	const removeOrder = async (seller) => {
		dispatch(
			cartItemsActions.setCartItem({
				products: {
					...Object.keys(orderCards.selectedOrderProducts)
						.filter((key) => !key.includes(seller))
						.reduce((obj, key) => {
							obj[key] = orderCards.selectedOrderProducts[key];
							return obj;
						}, {}),
				},
				sellerOrderPrice: {
					...Object.keys(orderCards.sellerOrderPrice)
						.filter((key) => !key.includes(seller))
						.reduce((obj, key) => {
							obj[key] = orderCards.sellerOrderPrice[key];
							return obj;
						}, {}),
				},
				totalPrice:
					orderCards.totalPrice - orderCards.sellerOrderPrice[seller],
				count:
					orderCards.productCount -
					orderCards.selectedOrderProducts[seller].length,
			})
		);
	};




    const postOrder = (orderProducts, sellerId, index) => {
        if(!addressErr[index]?.length && address[index]){
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
                    address: address[index],
                    products,
                    totalPrice: orderCards.sellerOrderPrice[sellerId]
                }
            }, orderHandler);


            dispatch(
                cartItemsActions.setCartItem({
                    products: {
                        ...Object.keys(orderCards.selectedOrderProducts)
                        .filter(key => !key.includes(sellerId))
                        .reduce((obj, key) => {
                            obj[key] = orderCards.selectedOrderProducts[key];
                            return obj;
                        }, {})
                    },
                    sellerOrderPrice: {
                        ...Object.keys(orderCards.sellerOrderPrice).filter(key => !key.includes(sellerId))
                        .reduce((obj, key) => {
                            obj[key] = orderCards.sellerOrderPrice[key];
                            return obj;
                        }, {})
                    },
                    totalPrice: orderCards.totalPrice - orderCards.sellerOrderPrice[sellerId],
                    count: orderCards.productCount - orderCards.selectedOrderProducts[sellerId].length

                })
            )
        }
    }

    const orderHandler = async (res) => {
        if (res.status === 200) {
            console.log(res);
            setOrderResponse(true);
            setTimeout(()=> setOrderResponse(false), 5000)
        }
    }
    

    return (
        <div className="p-4 min-h-100">
            {orderResponse ? (
                <div className="alert alert-success text-font fw-lighter" role="alert">
                    Order is successfully created, 
					<br/>
					Await until seller accepted/canceled order please Contact him via chat !!!
                </div>
            ) : <></>}
            {Object.keys(orderCards.selectedOrderProducts).map((seller, idx)=>{
                return(
                    <div className="card d-flex flex-column text-font p-3 mb-3" key={idx}>
                        <button onClick={()=> removeOrder(seller)} className="btn btn-outline-danger w-2-5 align-self-end justify-content-center text-center d-flex"><FontAwesomeIcon className="Xmark-font align-self-center" icon={faXmark} /></button>
                        <div className="card-body flex-md-row flex-column d-flex justify-content-center align-items-md-start align-items-center justify-content-md-between">
                            <div className="card col-md-6 col-10 m-2">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <ul className="list-group list-group-flush">
                                            {orderCards.selectedOrderProducts[seller]?.map((product)=>{
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
                                                        <div className="align-self-center col-3">
                                                            <div className="smaller mb-1">Price: {product.price.toFixed(2)}&#163;</div>
                                                            <div className="smaller mb-2">x{product.serves}</div>
                                                            <div className="fw-bold text-info">Total: {(product.price * product.serves).toFixed(2)}&#163;</div>
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
                                </ul>
                            </div>
                            <div className="card col-md-5 col-10">
                                <ul className="list-group list-group-flush p-1">
                                    <li className="list-group-item my-2">
                                        <p className="h4 mb-4">Products</p>
                                        {orderCards.selectedOrderProducts[seller]?.map((product, idx)=>{
                                            return(
                                                <div className="d-flex fw-light justify-content-between" key={idx}>
                                                    <div className="col-5">
                                                        <div className="me-2">{product.name}</div>
                                                        
                                                    </div>
                                                    <div className="col-4">x{product.serves}</div>
                                                    <div className="col-3 text-end">{(product.price* product.serves).toFixed(2)}&#163;</div>
                                                </div>
                                            )
                                        })}
                                    </li>
                                    <li className="list-group-item fw-light my-2">
                                        <div className="d-flex justify-content-between">
                                            <div>Price</div>
                                            <div >{orderCards.sellerOrderPrice[seller].toFixed(2)}&#163;</div>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div>Discount</div>
                                            <div >0&#163;</div>
                                        </div>
                                    </li>
                                    <li className="list-group-item d-flex flex-column">
                                        <div className="text-success d-flex justify-content-between">
                                            <div className="h5">Total</div>
                                            <div className="display-6 mb-4">{orderCards.sellerOrderPrice[seller].toFixed(2)}&#163;</div>
                                        </div>
                                        <div className="mt-3 mb-5">
                                            <label for="exampleInputPassword1" className="form-label">Enter Your Address: </label>
                                            <input type="text" onChange={(e) => checkAddress(e, idx)} className="form-control" id="exampleInputPassword1"/>
                                            {addressErr[idx]?.length ? (
                                                <small className="text-danger">{addressErr[idx]}</small>
                                            ) : <></>}
                                        </div>
                                        <button disabled={address[idx] && !addressErr[idx]? false : true} onClick={()=> postOrder(orderCards.selectedOrderProducts[seller], seller, idx)} className={`btn btn-dark w-100 rounded-0 align-self-bottom `}>Place Order</button>
                                        {addressErr[idx]?.length ? (
                                            <small className="text-danger mt-2">You have to enter a valid address</small>
                                        ): <></>
                                        }
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

export default BuyerOrder;

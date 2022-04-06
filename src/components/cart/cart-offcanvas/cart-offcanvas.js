import { Offcanvas } from "react-bootstrap";
import img from "../../../assets/imgs/landing page/bg-1.jpeg"
import StarRatings from 'react-star-ratings';
import { useSelector, useDispatch } from "react-redux";
import { orderActions } from '../../../store/orderSlice';
import "./cart-offcanvas.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function CartOffCanvas(props){
    const {controlProps} = props
    let cardItems = useSelector((state) => state.order);
    let dispatch = useDispatch();

    const handleClose = () => controlProps.setShow(false);

    useEffect(()=>{
        console.log(cardItems);
    },[controlProps.show])

    const addServes = async (item) => {
        let otherProducts = cardItems.selectedOrderProducts.filter((product)=> product._id !== item._id);

        await dispatch(orderActions.setCartItem({
            products: [{...item, serves: item.serves + 1}, ...otherProducts],
            totalPrice: cardItems.totalPrice + item.price
        }))
    }

    const decrementServes = async (item) => {
        let otherProducts = cardItems.selectedOrderProducts.filter((product)=> product._id !== item._id);
        
        if(item.serves < 2){
            await dispatch(orderActions.setCartItem({
                products: [...otherProducts],
                totalPrice: cardItems.totalPrice - item.price
            }));
        } else {
            await dispatch(orderActions.setCartItem({
                products: [{...item, serves: item.serves - 1}, ...otherProducts],
                totalPrice: cardItems.totalPrice - item.price
            }));
        }
    }

    return(
        <>
            <Offcanvas className="text-font" placement="end" show={controlProps.show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title >Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="my-2 h-84">
                        {cardItems.selectedOrderProducts.map((item, idx) => {
                            return (
                                <div className="card mb-3" key={idx}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={`${item.image? item.image[0].url : img}`} className="h-100 img-fluid rounded-start" alt="..."/>
                                        </div>
                                        <div className="col-md-8">
                                            <p className="card-title ps-2 fw-bold">{item.name}</p>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="card-text badge bg-warning text-light smaller my-1">{item.categoryId?.name}</div>
                                                        <div>
                                                            <StarRatings starDimension="1rem" starSpacing="0.025rem" rating={item.avgRate} starRatedColor="orange"/>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li className="list-group-item input-group-sm">
                                                <div className="d-flex justify-content-between">
                                                    <div className="input-group ">
                                                        <button className="btn btn-outline-success h-75 d-flex align-items-center" onClick={()=> addServes(item)} type="button">+</button>
                                                        <input type="text" value={item.serves} className="border border-rounded-1 p-1 w-15 text-center h-75" readOnly/>
                                                        <button className="btn btn-outline-danger h-75 d-flex align-items-center" onClick={()=> decrementServes(item)} type="button">-</button> 
                                                    </div>
                                                    <div className="card-text small fw-bold d-flex align-items-center">{item.price * item.serves}&#163;</div>
                                                </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {cardItems.selectedOrderProducts[0] && 
                    <div className="px-2">
                        <Link to="/placeOrder" className="btn btn-dark rounded-0 w-100 mb-2">Checkout</Link>
                        <div className="d-flex justify-content-between">
                            <div>Total Price</div>
                            <div>{cardItems.totalPrice}&#163;</div>
                        </div>
                    </div>}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default CartOffCanvas;
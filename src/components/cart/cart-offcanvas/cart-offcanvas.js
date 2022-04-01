import { Offcanvas } from "react-bootstrap";
import img from "../../../assets/imgs/1.jpeg"
import StarRatings from 'react-star-ratings';
import { useSelector } from "react-redux";
import "./cart-offcanvas.scss"

function CartOffCanvas(props){
    const {controlProps} = props
    let cardItems = useSelector((state) => state.order);

    const handleClose = () => controlProps.setShow(false);

    return(
        <>
            <Offcanvas placement="end" show={controlProps.show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title >Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="my-2">
                        {cardItems.selectedOrderProducts.map((item, idx) => {
                            return (
                                <div className="card mb-3" key={idx}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={`${item.image? item.image[0].url : img}`} className="h-100 img-fluid rounded-start" alt="..."/>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body ">
                                                <p className="card-title fw-bold">{item.name}</p>
                                                <ul className="list-group list-group-flush">
                                                    <li className="list-group-item">
                                                        <div className="d-flex justify-content-between">
                                                            <div className="card-text badge bg-primary smaller mt-1 mb-1">{item.categoryId?.name}</div>
                                                            <StarRatings starDimension="1rem" starSpacing="0.025rem" rating={item.avgRate} starRatedColor="orange"/>
                                                        </div>
                                                        <p className="card-text smaller text-muted">Serves: {item?.serves}</p>
                                                    </li>
                                                    <li className="list-group-item">
                                                    <div className="d-flex justify-content-between">
                                                        <div className="input-group input-group-sm">
                                                            <button className="btn btn-outline-secondary" type="button">+</button>
                                                            <input type="number" min="1" className="border border-rounded-1 p-1 w-30"/>
                                                            <button className="btn btn-outline-secondary" type="button">-</button> 
                                                        </div>
                                                        <div className="card-text smaller fw-bold">{item.price} EGP</div>
                                                    </div>
                                                    </li>
                                                </ul>
                                                
                                                
                                                {/* <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div></div>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    )
}

export default CartOffCanvas;
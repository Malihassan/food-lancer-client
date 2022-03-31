import { Offcanvas } from "react-bootstrap";
import img from "../../../assets/imgs/1.jpeg"
import StarRatings from 'react-star-ratings';
import { useSelector, useDispatch } from "react-redux";
import store from "../../../store/index"
import { useEffect } from "react";
import { orderActions } from "../../../store/orderSlice";

function CartOffCanvas(props){
    const {showProps} = props
    let cardItems = useSelector((state) => state.order);
    const dispatch = useDispatch()
    // let cardItems = {
    //     selectedOrderProducts: []
    // }

    useEffect(()=>{
        console.log(store.getState().order)
    }, [showProps.show])

    const handleClose = () => showProps.setShow(false);

    return(
        <>
            <Offcanvas placement="end" show={showProps.show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title >Cart</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="my-2">
                        {cardItems.selectedOrderProducts.map((item, idx) => {
                            return (
                                <>
                                    <div className="card mb-3" key={`${idx}`}>
                                        <div class="row g-0">
                                            <div className="col-md-4">
                                                <img src={`${item.image? item.image[0].url : img}`} className="h-100 img-fluid rounded-start" alt="..."/>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <div className="d-flex justify-content-between">
                                                        <div className="card-text mt-1">{item.categoryId?.name}</div>
                                                        <div className="card-text"><StarRatings starDimension="1rem" starSpacing="0.025rem" rating={item.avgRate} starRatedColor="orange"/></div>
                                                    </div>
                                                    <p className="card-text">Serves: {item?.serves}</p>
                                                    {/* <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
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
import React, { useState, useEffect } from 'react'
import StarRatings from 'react-star-ratings';
import "./product-info.css"

function ProductInfo(){

    const [rating, setRating] = useState(0)

    useEffect(()=>{
        setRating(2.5)
    }, [])

    return (
        <>
            <div className="row justify-content-between mx-2 bg-light">
                <div id="carouselExampleIndicators" className="carousel slide col-5" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                        <img src="../../assets/imgs/landing page/bg-1.jpeg" className="d-block w-100" alt="..."/>
                        </div>
                        <div className="carousel-item">
                        <img src="../../assets/imgs/landing page/bg-2.jpeg" className="d-block w-100" alt="..."/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="col-6">
                    <p className='display-5'>ProductName</p>
                    <div className='d-flex'>
                        <StarRatings className="me-2" starDimension="1rem" starSpacing="0.05rem" rating={rating} starRatedColor="orange"/>
                        <p className='m-1'>{rating} / 5</p>
                    </div>
                    <div className='mt-3 ms-2'>
                        <p>SellerName</p>
                        <p>Price</p>
                        <p>Category</p>
                        <p>Status</p>
                    </div>
                    <div className='col-12 d-flex justify-content-center'>
                        <button className='btn shadow maroon text-light text-font w-75 m-1'>Add To Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductInfo
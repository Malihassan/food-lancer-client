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
            <div className="row justify-content-between text-dark p-2">
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
                        <img src="../../assets/imgs/1.jpeg" className="d-block w-100" alt="..."/>
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
                        <StarRatings starDimension="1rem" starSpacing="0.05rem" rating={rating} starRatedColor="orange"/>
                        <p className='m-1 ms-2'>{rating} / 5</p>
                    </div>
                    <div className='mt-3'>
                        <p>SellerName</p>
                        <p>Price</p>
                        <p>Category</p>
                        <p>Status</p>
                    </div>
                    <div className='d-flex mt-3'>
                        <p className='col-2'>Serves</p>
                        <div className='col-8 d-flex'>
                            <div className='mx-1'>
                                <input type="radio" className="btn-check" name="options-outlined" id="one" autoComplete="off"/>
                                <label className="p-1 text-center small btn-serve" htmlFor="one">1</label>
                            </div>
                            <div className='mx-1'>
                                <input type="radio" className="btn-check" name="options-outlined" id="two" autoComplete="off"/>
                                <label className="p-1 text-center small btn-serve" htmlFor="two">2</label>
                            </div>
                            <div className='mx-1'>
                                <input type="radio" className="btn-check" name="options-outlined" id="three" autoComplete="off"/>
                                <label className="p-1 text-center small btn-serve" htmlFor="three">3</label>
                            </div>
                            <div className='mx-1'>
                                <input type="radio" className="btn-check" name="options-outlined" id="four" autoComplete="off"/>
                                <label className="p-1 text-center small btn-serve" htmlFor="four">4</label>
                            </div>
                            <div className='mx-1'>
                                <input type="radio" className="btn-check" name="options-outlined" id="five-plus" autoComplete="off"/>
                                <label className="p-1 text-center small btn-serve" htmlFor="five-plus">+5</label>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 d-flex justify-content-center'>
                        <button className='btn shadow maroon text-light text-font w-100 me-1 my-1'>Add To Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductInfo
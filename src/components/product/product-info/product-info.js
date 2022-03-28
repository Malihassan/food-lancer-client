import React, { useState, useEffect } from 'react'
import StarRatings from 'react-star-ratings';
import "./product-info.scss"
import { Link } from 'react-router-dom';

function ProductInfo(props){

    const {data} = props;

    const [rating, setRating] = useState(0);
    const [extra, setExtra] = useState(false);
    const [serves, setServes] = useState(0);

    useEffect(()=>{
        setRating(data.avgRate);
    }, [])

    const viewExtraInput = () =>{
        setExtra(true);
    }

    const hideExtraInput = () => {
        setExtra(false);
    }

    const countServes = (e) => {
        switch(e.target.id){
            case "inp-1":
                setServes(1);
            break;
            case "inp-2":
                setServes(2);   
            break;
            case "inp-3":
                setServes(3);
            break;
            case "inp-4":
                setServes(4);
            break;
            case "inp-5":
                setServes(5);
            break;
            case "extra":
                setServes(parseInt(e.target.value));
            break;
        }
    }

    return (
        <>
            <div className="row flex-xl-row flex-column justify-content-between text-dark p-2">
                <div id="carouselExampleIndicators" className="carousel slide col-xl-6 col-12 pt-xl-2" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        {data?.image?.map((image, index) => {
                            return (
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className={`${index === 0 ? "active" : ""}`} aria-current={`${index === 0 ? "true" : ""}`} aria-label={`Slide ${index + 1}`}></button>
                            )
                        })}
                    </div>
                    <div className="carousel-inner">
                        {data?.image?.map((image, index)=> {
                            return (
                                <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                                    <img src={image.url} className="d-block w-100 carousel-h" alt="..." />
                                </div>
                            )
                        })}
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
                <div className="col-xl-6 col-12 mt-4 mt-xl-0">
                    <p className='display-5'>{data.name}</p>
                    <div className='d-flex'>
                        <StarRatings starDimension="1rem" starSpacing="0.05rem" rating={rating} starRatedColor="orange"/>
                        <p className='m-1 ms-2'>{rating || 0} / 5</p>
                    </div>
                    <div className='mt-3'>
                        <p>Seller: {data.sellerId?.userName}</p>
                        <p>{data.price} EGP</p>
                        <p>Category: {data.categoryId?.name}</p>
                    </div>
                    <div className='d-flex my-3'>
                        <p className='col-2 mt-0 mt-md-4 mt-xl-3'>Serves</p>
                        <div className='col-8 d-flex align-items-center justify-content-center flex-wrap'>
                            <div className='mx-1'>
                                <input type="radio" onClick={(e)=> countServes(e)} className="btn-check" name="options-outlined" id="inp-1" autoComplete="off"/>
                                <label className="p-1 text-center smaller btn-serve" htmlFor="inp-1">1</label>
                            </div>
                            <div className='mx-1'>
                                <input type="radio" onClick={(e)=> countServes(e)}  className="btn-check" name="options-outlined" id="inp-2" autoComplete="off"/>
                                <label className="p-1 text-center smaller btn-serve" htmlFor="inp-2">2</label>
                            </div>
                            <div className='mx-1'>
                                <input type="radio" onClick={(e)=> countServes(e)}  className="btn-check" name="options-outlined" id="inp-3" autoComplete="off"/>
                                <label className="p-1 text-center smaller btn-serve" htmlFor="inp-3">3</label>
                            </div>
                            <div className='mx-1'>
                                <input type="radio" onClick={(e)=> countServes(e)}  className="btn-check" name="options-outlined" id="inp-4" autoComplete="off"/>
                                <label className="p-1 text-center smaller btn-serve" htmlFor="inp-4">4</label>
                            </div>
                            <div className='mx-1'>
                                <input type="radio" onClick={(e)=> countServes(e)}  className="btn-check" name="options-outlined" id="inp-5" autoComplete="off"/>
                                <label className="p-1 text-center smaller btn-serve" htmlFor="inp-5">5</label>
                            </div>
                            <div className='mx-1'>
                                <input type="radio" onClick={()=> viewExtraInput()} className="btn-check" name="options-outlined" id="inp-plus" autoComplete="off"/>
                                <label className="p-1 text-center smaller btn-serve" htmlFor="inp-plus">+</label>
                            </div>
                            {
                                extra && 
                                <div className='mx-1 col-6 d-flex justify-content-md-end justify-content-lg-center justify-content-center my-lg-3 my-md-0 my-2'>
                                    <input type="number" onChange={(e)=> countServes(e)} min="6" class="form-control me-1 g-0 w-50" id="extra" placeholder="Serves"/>
                                    <button className='btn btn-outline-secondary g-0' onClick={()=> hideExtraInput()}>Hide</button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className={`col-12 d-flex justify-content-center align-self-bottom ${extra ? '' : 'mt-4'}`}>
                        <Link to={{pathname: "/order", state: {id: data._id, serves: serves}}} className='btn shadow maroon text-light text-font w-100 me-1'>Add To Cart</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductInfo
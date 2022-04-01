import "./product-tabs.scss";
import "../product-info/product-info.scss"
import StarRatings from 'react-star-ratings';

function ProductTabs(props){

    const {data} = props;

    return(
        <>
            <nav>
            <div className="nav nav-tabs" id="product-tab" role="tablist">
                <button className="nav-link custom-tab-font active" id="nav-description-tab" data-bs-toggle="tab" data-bs-target="#nav-description" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Description</button>
                <button className="nav-link custom-tab-font" id="nav-rating-tab" data-bs-toggle="tab" data-bs-target="#nav-rating" type="button" role="tab" aria-controls="nav-rating" aria-selected="false">Reviews ({data.reviews?.length || 0})</button>
            </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane text-dark fade show active p-2" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab">{data.description}</div>
                <ul className="tab-pane text-dark fade p-2 list-group list-group-flush" id="nav-rating" role="tabpanel" aria-labelledby="nav-rating-tab">
                    {data.reviews?.map((review)=>{
                        return <li className="list-group-item">
                            <div className="d-flex">
                                <div className="fw-bold me-4">
                                    {review?.buyerId?.userName}
                                </div>
                                <div>
                                    <StarRatings starDimension="0.5rem" starSpacing="0.025rem" rating={review?.rate} starRatedColor="orange"/>
                                    <small className="ms-2 smaller">{review?.rate} / 5</small>
                                </div>
                            </div>
                            <div className="mt-2">
                                {review?.comment}
                            </div>
                        </li>
                    })}
                </ul>
            </div>
        </>
    )
}

export default ProductTabs
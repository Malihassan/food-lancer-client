import ProductInfo from "../../../components/product/product-info/product-info";
import ProductTabs from "../../../components/product/product-tabs.js/product-tabs";
import "./product-details.scss"

function ProductDetails(){
    return (
        <div className="container-fluid bg-yellow p-1 g-0 d-flex justify-content-center align-items-center min-vh-100">
            <div className="card" style={{width:"80rem"}}>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item"><ProductInfo /></li>
                  <li className="list-group-item"><ProductTabs/></li> 
                </ul>
            </div>
        </div>

    )
}

export default ProductDetails;
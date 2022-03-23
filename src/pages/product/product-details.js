import ProductInfo from "../../components/product/product-info";
import "./product-details.css"

function ProductDetails(){
    return (
        <div className="container-fluid bg-yellow p-3 g-0">
            <div className="card">
                <ProductInfo />
            </div>
        </div>

    )
}

export default ProductDetails;
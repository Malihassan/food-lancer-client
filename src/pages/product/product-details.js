import ProductInfo from "../../components/product/product-info";
import "./product-details.css"

function ProductDetails(){
    return (
        <div className="bg-yellow g-0">
            <div className="card m-2">
                <ProductInfo />
            </div>
        </div>

    )
}

export default ProductDetails;
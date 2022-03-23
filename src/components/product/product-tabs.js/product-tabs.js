import "./product-tabs.scss";

function ProductTabs(){
    return(
        <>
            <nav>
            <div class="nav nav-tabs" id="product-tab" role="tablist">
                <button class="nav-link custom-tab-font active" id="nav-description-tab" data-bs-toggle="tab" data-bs-target="#nav-description" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                <button class="nav-link custom-tab-font" id="nav-rating-tab" data-bs-toggle="tab" data-bs-target="#nav-rating" type="button" role="tab" aria-controls="nav-rating" aria-selected="false">Profile</button>
            </div>
            </nav>
            <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active p-2" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab">Text....</div>
                <div class="tab-pane fade p-2" id="nav-rating" role="tabpanel" aria-labelledby="nav-rating-tab">Another Text...</div>
            </div>
        </>
    )
}

export default ProductTabs
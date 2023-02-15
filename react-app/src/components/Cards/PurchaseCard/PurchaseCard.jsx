import EditReviewForm from "../../Forms/EditReviewForm";

const PurchaseCard = ({purchase}) => {
    let reviewId = null
    if (purchase?.order?.review_id){
        reviewId = purchase.order.review_id
    }
    console.log(purchase, "purchase")
    return (

        <div className="purchase-container">
            <div className="purchase-img-container">
                <img src={purchase.item.preview_url} alt="" className="purchase-image" />
            </div>
            <div className="purchase-info-container">
                <div className="purchase-info">
                    <div className="purchase-date">
                        <span>Purchased On: </span>
                        <span>{purchase.order.created_at}</span>
                    </div>
                    <div className="sale-price">
                        <span>Sale Price: </span>
                        <span>${purchase.order.order_total.toFixed(2)}</span>
                    </div>

                    <div className="payment-type">
                        <span>Payment Type: </span>
                        <span>Credit Card (- this is currently hard coded) </span>
                    </div>

                </div>
                <div className="item-info">
                    <span>{purchase.item.name} </span>
                    <span>{purchase.item.description} </span>
                    <span>{purchase.item.size}</span>

                </div>

            </div>
            <div className="buttons-container">
                {/* !@#$ Add buttons here */}
                {/* !@#$ Add conditional rendering for leave feedback or edit/delete feedback
                    depending on if feedback has already been left  */}
                    <EditReviewForm review={purchase.order.review} itemId={purchase.item.id}/>
            </div>
        </div>

    )
}

export default PurchaseCard;

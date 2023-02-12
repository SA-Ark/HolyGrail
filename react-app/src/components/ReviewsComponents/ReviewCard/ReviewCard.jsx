import * as utils from '../../../store/utils';

const ReviewCard = ({ review }) => {

    // const [day, month, year] = utils.dateToParts(review.created_at);

    return (
        <div className="review-card-container">
            "Hello from a review card"
            <div className="review-body">
                <span className="date">
                    {/* {month + " "}{day + ", "}{year} */}
                    DATE DATA
                </span>
                <span className="stars">
                    {review.stars}
                </span>
                <span className="review-text">
                    {review.review_body}
                </span>
                <span className="badges">
                    Trusted Seller
                </span>
                <span className="title">
                    {review.name}
                </span>
                <span className="description">
                    {review.item_description}
                </span>

                <img src={review.preview_url} alt="" className="product-image" />
            </div>


        </div>
    )
}


export default ReviewCard;

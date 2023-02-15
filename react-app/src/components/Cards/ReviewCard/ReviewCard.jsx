import * as utils from '../../../store/utils';
import './ReviewCard.css';

const ReviewCard = ({ review }) => {

    // !@#$ Take note about what is coming into this card. Each review is an object containing a review and its corresponding item
    // review.review and review.item

    console.log("REVIEW -->", review);


    // const [day, month, year] = utils.dateToParts(review.created_at);
    const stars = () => {
        if (review.review.stars === 5) return "★★★★★";
        if (review.review.stars === 4) return "★★★★";
        if (review.review.stars === 3) return "★★★";
        if (review.review.stars === 2) return "★★";
        else return "★";
    }

    return (
        <>
            <div className="review-card-container">
                <div className="review-body">
                    <span className="review-date">
                        {review.review.created_at}
                    </span>
                    <span className="stars">
                        {stars()}
                    </span>
                    <span className="review-text">
                        {review.review.review_body}
                    </span>
                    <span className="review-description">
                        {review.item.name}
                    </span>
                </div>
                <div className='review-img-container'>
                    <img src={review.item.preview_url} alt="" className="product-image" />
                </div>


            </div>

        </>
    )
}


export default ReviewCard;

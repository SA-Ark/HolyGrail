import * as utils from '../../../store/utils';

const ReviewCard = ({ review }) => {

    // const [day, month, year] = utils.dateToParts(review.created_at);
    console.log(review, "<-----review")

    const stars = () => {
        if (review.stars === 5) return "⭐️⭐️⭐️⭐️⭐️";
        if (review.stars === 4) return "⭐️⭐️⭐️⭐️";
        if (review.stars === 3) return "⭐️⭐️⭐️";
        if (review.stars === 2) return "⭐️⭐️";
        else return "⭐️";
    }

    return (
        <>
            <hr />
            <div className="review-card-container">
                <br />
                <div className="review-body">
                    <span className="date">
                        {/* {month + " "}{day + ", "}{year} */}
                        DATE HERE
                    </span>

                    <br />

                    <span className="stars">
                        {/* {review.stars} */}
                        {stars()}
                    </span>

                    <br />
                    <br />

                    <span className="review-text">
                        {review.review_body}
                    </span>

                    <br />

                    <span className="badges">
                        {/* Put badges here */}
                        SELLER BADGES HERE
                    </span>

                    <br />
                    <br />
                    <br />

                    <span className="title">
                        {review.name}
                        ITEM NAME HERE
                    </span>
                    <br />
                    <span className="description">
                        {review.item_description}
                    </span>

                    <br />

                    <img src={review.preview_url} alt="" className="product-image" />

                    <br />

                </div>


            </div>
        
        </>
    )
}


export default ReviewCard;

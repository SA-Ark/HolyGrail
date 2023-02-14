import * as utils from '../../../store/utils';

const ReviewCard = ({ review }) => {

    // !@#$ Take note about what is coming into this card. Each review is an object containing a review and its corresponding item
    // review.review and review.item


    // const [day, month, year] = utils.dateToParts(review.created_at);
    const stars = () => {
        if (review.review.stars === 5) return "⭐️⭐️⭐️⭐️⭐️";
        if (review.review.stars === 4) return "⭐️⭐️⭐️⭐️";
        if (review.review.stars === 3) return "⭐️⭐️⭐️";
        if (review.review.stars === 2) return "⭐️⭐️";
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

                    <span className="title">
                        {"<username here> reviewed : " + review.item.name}
                    </span>

                    <br />

                    <span className="stars">
                        {/* {review.stars} */}
                        {"stars:" + stars()}
                    </span>

                    <br />

                    <span className="review-text">
                        {review.review.review_body}
                    </span>

                    <br />

                    <span className="badges">
                        {/* Put badges here */}
                        {/* SELLER BADGES HERE */}
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

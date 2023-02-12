import ReviewCard from '../../ReviewsComponents/ReviewCard';

const FeedbackTab = ({ reviews }) => {

    return (
        <div className="feedback-container">
            <div className="feedback-header">
                <span className="score-title">
                    Seller Score
                </span>
                <span className="avg-stars">
                    {/* Put average total star rating here */}
                </span>
                <span className="review-count">
                    {/* Put total num reviews here */}
                </span>
                <span className="badges">
                    Trusted Seller
                </span>
            </div>
            {
                reviews?.length
                    ? reviews.map(review => {
                        return <ReviewCard review={review} />
                    })
                    : null
            }
        </div>
    )
}

export default FeedbackTab;

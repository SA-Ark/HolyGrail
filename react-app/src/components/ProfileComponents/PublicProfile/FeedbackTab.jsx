import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewCard from '../../ReviewsComponents/ReviewCard';
import { thunkLoadReviews } from '../../../store/reviews';
import { thunkLoadItems } from '../../../store/items';
import { deNormalize, getUserItems, getUserReviews } from '../../../store/utils';



const FeedbackTab = ({ reviews }) => {

    return (
        <div className="feedback-container">
            <h2>Hello From feedback tab</h2>
            <div className="feedback-header">
                <span className="score-title">
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
                reviews?.reviews?.length
                    ? reviews.reviews.map(review => {
                        return <ReviewCard review={review} key={review.id} />
                    })
                    : null
            }
        </div>
    )
}

export default FeedbackTab;

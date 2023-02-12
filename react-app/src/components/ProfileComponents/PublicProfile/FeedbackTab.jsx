import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewCard from '../../ReviewsComponents/ReviewCard';
import { thunkLoadReviews } from '../../../store/reviews';

const FeedbackTab = ({ reviews }) => {


    const dispatch = useDispatch()
    const {userId} = useParams
    console.log(userId)

    useEffect(()=> {

        dispatch(thunkLoadReviews(userId))

    },[reviews])



    return (
        <div className="feedback-container">
            <h2>Hello From feedback tab</h2>
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

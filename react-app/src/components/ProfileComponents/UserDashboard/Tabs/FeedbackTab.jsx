import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewCard from '../../../Cards/ReviewCard';
import { thunkLoadCurrReviews } from '../../../../store/reviews';
import { thunkLoadReviews } from '../../../../store/reviews';
import { thunkLoadItems } from '../../../../store/items';
import { deNormalize, getUserItems, getUserReviews } from '../../../../store/utils';
import './FeedbackTab.css';



const FeedbackTab = ({ reviews }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.session?.user);
    console.log('REVIEW --->', reviews)

    const avg_star_rating = () => {
        if (reviews.avg_star_rating > 4.5) return "★★★★★";
        if (reviews.avg_star_rating > 3.5) return "★★★★";
        if (reviews.avg_star_rating > 2.5) return "★★★";
        if (reviews.avg_star_rating > 1.5) return "★★";
        else return "★";
    }

    useEffect(() => {
        dispatch(thunkLoadCurrReviews(user.id));
    }, [dispatch, user.id])

    return (
        <div className="feedback-container">
            <div className="feedback-header">
                <h3>Seller Score</h3>
                <span className="avg-stars">
                    {avg_star_rating()}
                </span>
                <span className="review-count">
                    {reviews.num_reviews} Feedback
                </span>
            </div>
            {
                reviews?.reviews?.length
                    ? reviews.reviews.map(review => {
                        return <ReviewCard review={review} key={review.review.id} />
                    })
                    : null
            }
        </div>
    )
}

export default FeedbackTab;

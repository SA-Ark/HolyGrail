import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewCard from '../../ReviewsComponents/ReviewCard';
import { thunkLoadReviews } from '../../../store/reviews';
import { thunkLoadItems } from '../../../store/items';
import { deNormalize, getUserItems, getUserReviews } from '../../../store/utils';



const FeedbackTab = ({ reviews }) => {
    console.log(reviews, "<--- REVIEWS")

    // const dispatch = useDispatch();
    // // const spots = utils.deNormalize(useSelector((store) => store.spots.allSpots));

    // const reviewsObj = deNormalize(useSelector(state => state.reviews?.allReviews));
    // // const userId = useSelector(state => state?.session?.user?.id);
    // const items = useSelector(state => state?.items?.allItems);
    // let reviews;

    // const {userId} = useParams()
    // console.log(userId)

    // useEffect(()=> {

    //     dispatch(thunkLoadReviews(userId))
    //     dispatch(thunkLoadItems(userId))
    //     if (reviewsObj) reviews = getUserReviews(deNormalize(reviewsObj), userId)
    //     console.log(reviews)

    // },[reviews, reviewsObj])



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

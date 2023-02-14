import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkEditReview, thunkLoadSingleReview } from '../../store/reviews';

const EditReviewForm = () => {
    const dispatch = useDispatch();
    const { reviewId } = useParams();

    const oldReview = useSelector(state => state?.reviews?.singleReview?.review);
    // console.log("OLD --->", oldReview);

    const [review, setReview] = useState(oldReview?.review_body);
    const [stars, setStars] = useState(oldReview?.stars);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        dispatch(thunkLoadSingleReview(reviewId))
            setReview(oldReview?.review_body);
            setStars(oldReview?.stars);
            // console.log("XXXXXXXXX", stars, review)
    }, [dispatch, reviewId])


    const onSubmit = async (e) => {
        const formErrors = [];
        if (!review) formErrors.push('A meaningful comment for your review is required!');
        if (!stars) formErrors.push('A star rating is required!');
        e.preventDefault();
        setErrors([formErrors])

        const newReview = {
            reviewBody: review,
            stars
        }

        const res = await dispatch(thunkEditReview(newReview, reviewId));

        if (res?.ok) {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors)
        }
    }

    return (
        <form className="edit-review-form" onSubmit={onSubmit}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label>Review</label>
                <textarea
                    type='textarea'
                    name='review'
                    onChange={(e) => setReview(e.target.value)}
                    value={review}
                ></textarea>
            </div>
            <div>
                <label>Stars</label>
                <input
                    type='number'
                    name='stars'
                    onChange={(e) => setStars(e.target.value)}
                    value={stars}
                ></input>
            </div>
            <button type='submit'>Submit Review</button>
        </form>
    )
}

export default EditReviewForm;
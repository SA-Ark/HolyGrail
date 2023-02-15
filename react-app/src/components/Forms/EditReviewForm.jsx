import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkCreateReview, thunkEditReview, thunkLoadSingleReview } from '../../store/reviews';


const EditReviewForm = ({review, itemId}) => {
    const dispatch = useDispatch();

    const [reviewBody, setReviewBody] = useState(review?.review_body);
    const [stars, setStars] = useState(review?.stars);
    const [errors, setErrors] = useState([]);
    const [submitText, setSubmitText] = useState(review?.id ? "Edit Feedback": "Leave Feedback")



    const onSubmit = async (e) => {
        e.preventDefault();
        const formErrors = [];
        if (!reviewBody) formErrors.push('A meaningful comment for your review is required!');
        if (!stars) formErrors.push('A star rating is required!');
        setErrors([formErrors])
        let newReview;
        let res;

        newReview = {
            reviewBody,
            stars
        }
        if (errors.length){
            if(review){

                setSubmitText("Edit Feedback")
                res = await dispatch(thunkEditReview(newReview, review?.id));
            }else{
                setSubmitText("Edit Feedback")
                res = await dispatch(thunkCreateReview(newReview, itemId))
            }

        }


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
                    onChange={(e) => setReviewBody(e.target.value)}
                    value={review?.review_body}
                ></textarea>
            </div>
            <div>
                <label>Stars</label>
                <input
                    type='number'
                    name='stars'
                    onChange={(e) => setStars(e.target.value)}
                    value={review?.stars}
                ></input>
            </div>
            <button type='submit'>{submitText}</button>
        </form>
    )
}

export default EditReviewForm;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { actionEditReview, thunkCreateReview, thunkEditReview, thunkLoadSingleReview } from '../../store/reviews';
import Buttons from '../Buttons';
const { DeleteReviewButton } = Buttons;


const EditReviewForm = ({ review, itemId, closeModal }) => {
    console.log(review, 'reviewwwww')
    const dispatch = useDispatch();
    const history = useHistory();
    const [reviewBody, setReviewBody] = useState(review?.review_body || '');
    const [stars, setStars] = useState(review?.stars || '');
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [submitText, setSubmitText] = useState(review?.id ? "Edit Feedback" : "Leave Feedback");
    const sessionUser = useSelector(state => state.user);

    const reviewRefresh = async () => {
        await dispatch[actionEditReview(review.buyer_id)]
    }

    const onSubmit = (e) => {
        e.preventDefault();


        const formErrors = [];
        if (!reviewBody) formErrors.push('A meaningful comment for your review is required!');
        if (!stars) formErrors.push('A star rating is required!');
        setErrors(formErrors);

        let newReview = {
            reviewBody,
            stars
        };

        dispatch(thunkEditReview(newReview, review?.id))
            .then(() => {
                setStars(newReview.stars);
                setReviewBody(newReview.reviewBody);
            })
            .then(() => {
                setHasSubmitted(!hasSubmitted);
            })
            .then(() => {
                history.push(`/dashboard/${sessionUser}`);
            })
            .catch(async (res) => {
                const data = await res.json();
                if (data.errors) {
                    setErrors(data.errors);
                }
            });
    };

    if (onSubmit) reviewRefresh()


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
                    value={reviewBody}
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
            <button type='submit'>{submitText}</button>
            <DeleteReviewButton revBod={setReviewBody} star={setStars} reviewId={review?.id} />
        </form>
    );
};

export default EditReviewForm;



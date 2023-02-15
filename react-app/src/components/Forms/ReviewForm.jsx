import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { thunkCreateReview, thunkEditReview, thunkLoadSingleReview } from '../../store/reviews';
import Buttons from '../Buttons';
const { DeleteReviewButton } = Buttons;


const ReviewForm = ({ review, itemId, closeModal }) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const stateReview = useSelector(state => state.reviews?.singleReview?.review)
    const [reviewBody, setReviewBody] = useState(review?.review_body);
    const [stars, setStars] = useState(review?.stars);
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [rev, setRev] = useState("")
    const [star, setStar] = useState("")

    // const [deleted, setDeleted] = useState(false)
    const [submitText, setSubmitText] = useState(review?.id ? "Edit Feedback" : "Leave Feedback")
    console.log(stateReview, stateReview?.review_body, stateReview?.stars, "STATE")
    const sessionUser = useSelector(state => state.user)

    useEffect(() => {
        if (!stateReview?.id) {

            // setReviewBody("")
            // setStars(stateReview?.stars)
        }
    }, [review, stateReview])
    console.log(reviewBody, stars, "reviews")



    const onClick = () => {
        console.log("COMING IN")
    }


    const onSubmit = (e) => {
        e.preventDefault()
        let newReview = {
            reviewBody,
            stars
        }
        return dispatch(thunkEditReview(
            newReview, review?.id
        ))
            .then(() => {
                setHasSubmitted(!hasSubmitted);
            })
            .then(() => {
                history.push(`/dashboard/${sessionUser}`);
            })
            .then(() => {
                setStars('');
                setReviewBody('');
            })
            .catch(async (res) => {
                const data = await res.json()
                if (data.errors) {
                    setErrors(data.errors);
                }
            })
    };

    // const onSubmit = async (e) => {
    //     e.preventDefault();
    //     const formErrors = [];
    //     if (!reviewBody) formErrors.push('A meaningful comment for your review is required!');
    //     if (!stars) formErrors.push('A star rating is required!');
    //     setErrors([formErrors])
    //     let newReview;
    //     let res;

    // newReview = {
    //     reviewBody,
    //     stars
    // }
    //     if (errors.length) {
    //         if (review) {

    //             setSubmitText("Edit Feedback")
    //             res = await dispatch(thunkEditReview(newReview, review?.id));
    //         }
    //         else {
    //             setSubmitText("Edit Feedback")
    //             res = await dispatch(thunkCreateReview(newReview, itemId))
    //         }

    //     }
    //     let data;
    //     if (res?.ok) {
    //         data = await res.json();
    //         console.log(data, 'data in if')
    //         if (data && data.errors) setErrors(data.errors)
    //     } else {
    //         console.log(data, 'data')
    //     }
    //     // closeModal()
    // }


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
    )
}

export default ReviewForm;

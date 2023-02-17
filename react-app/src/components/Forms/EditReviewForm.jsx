import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { thunkCreateReview, thunkEditReview, thunkLoadSingleReview } from '../../store/reviews';
import Buttons from '../Buttons';
const { DeleteReviewButton, ReviewButton } = Buttons;

const EditReviewForm = ({ prevReview, setPrevReview }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch();
    const [reviewBody, setReviewBody] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory()
    console.log(prevReview, "this one?")

    const onDel = () => {
        if (Object.keys(prevReview)) {

            setPrevReview({})
        }
        setReviewBody("")
        setStars("")

    }

    useEffect(() => {
        setReviewBody(prevReview?.review_body)
        setStars(prevReview?.stars)
    }, [prevReview])

    const updateBody = (e) => {

        setReviewBody(e.target.value)
        console.log(reviewBody, "REVIEWBODY")
        // bodVal = reviewBody

    }
    const updateStars = (e) => {

        setStars(e.target.value)
        console.log(stars, "STARS")
        // starVal = stars


    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        const editReview = {
            reviewBody: reviewBody,
            stars
        }
        const data = await dispatch(thunkEditReview(editReview, prevReview?.id));

        if (data && data.errors) {
            setErrors(data.errors)
        } else {
            setPrevReview({
                id: prevReview?.id,
                review_body: data?.review?.review_body,
                stars: data?.review?.stars
            })
            closeModal()
        }
        // await dispatch(thunkLoadCurrReviews(user?.id))
    }

    return (
        <form className="edit-review-form" onSubmit={onSubmit}>
            <div>
                {Object.values(errors).map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label>Review</label>
                <textarea
                    type='textarea'
                    name='review'
                    onChange={updateBody}
                    value={reviewBody}
                    id="body"
                ></textarea>
            </div>
            <div>
                <label>Stars</label>
                <input
                    type='number'
                    name='stars'
                    onChange={updateStars}
                    value={stars}
                    id="stars"
                ></input>
            </div>
            <button className="feedback-button" type='submit'>{"Edit Feedback"}</button>
            <DeleteReviewButton onDel={onDel} reviewId={prevReview?.id} />
        </form>
    )
}

export default EditReviewForm;

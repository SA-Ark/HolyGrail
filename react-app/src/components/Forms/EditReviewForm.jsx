import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { thunkCreateReview, thunkEditReview, thunkLoadSingleReview } from '../../store/reviews';
import Buttons from '../Buttons';
const { DeleteReviewButton } = Buttons;

const EditReviewForm = ({ prevReview, setPrevReview}) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch();
    const [reviewBody, setReviewBody] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState([]);
    const history = useHistory()
    console.log(prevReview, "this one?")

     const onDel = ()=>{
        if (Object.keys(prevReview)){

            setPrevReview({})
        }
        setReviewBody("")
        setStars("")

    }

    useEffect(()=>{
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
    console.log(prevReview)
    console.log(reviewBody, stars, "BOD")

    const onSubmit = async (e) => {
        e.preventDefault();
        const formErrors = [];
        if (!reviewBody) formErrors.push('A meaningful comment for your review is required!');
        if (!stars) formErrors.push('A star rating is required!');
        setErrors([formErrors])

            const editReview = {
                reviewBody: reviewBody,
                stars
            }
            const data = await dispatch(thunkEditReview(editReview, prevReview?.id));

            console.log(data?.review, "data edit rev")

            setPrevReview({
                id: prevReview?.id,
                review_body: data?.review?.review_body,
                stars: data?.review?.stars
            })

            console.log(prevReview, "PREV")

            closeModal()
            history.push("/dashboard/1")

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
            <button type='submit'>Edit Feedback</button>
            <DeleteReviewButton onDel={onDel} reviewId={prevReview?.id} />
        </form>
    )
}

export default EditReviewForm;

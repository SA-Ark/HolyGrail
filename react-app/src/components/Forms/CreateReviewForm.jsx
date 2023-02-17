import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { thunkCreateReview, thunkEditReview, thunkLoadSingleReview } from '../../store/reviews';


const CreateReviewForm = ({ itemId, setPrevReview, prevReview}) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch();

    const [reviewBody, setReviewBody] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState([]);

    const history = useHistory()

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
        let newReview;

        newReview = {
            reviewBody,
            stars
        }

        const data = await dispatch(thunkCreateReview(newReview, itemId))
        console.log('data in form')
        if (data && data.errors) {
            setErrors(data.errors)
        } else {
            setPrevReview({
                id: data?.id,
                review_body: reviewBody,
                stars
            })
            closeModal()
        }
    }


return (
    <form className="create-review-form" onSubmit={onSubmit}>
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
        <button className="feedback-button" type='submit'>Leave Review</button>
    </form>
)

    }
export default CreateReviewForm;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { thunkCreateReview, thunkEditReview, thunkLoadSingleReview } from '../../store/reviews';
import './CreateReview.css'

const CreateReviewForm = ({ itemId, setPrevReview, prevReview }) => {
    const { closeModal } = useModal()
    const dispatch = useDispatch();

    const [reviewBody, setReviewBody] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState([]);

    const history = useHistory()

    const updateBody = (e) => {

        setReviewBody(e.target.value)
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
        <div className='create-edit-feedback-container'>
            <span className="feedback-title">Leave some feedback</span>
            <form className="feedback-form" onSubmit={onSubmit}>
            <div className="error-messages">
                    {Object.values(errors).map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div>
                    <label className='feedback-label'>
                        <textarea
                            placeholder='How did you like your item?'
                            className='feedback-text'
                            type='textarea'
                            name='review'
                            onChange={updateBody}
                            value={reviewBody}
                            id="body"
                        ></textarea>
                    </label>
                    <label className='feedback-label'>
                        <input
                        placeholder='Rate your item'
                            className='feedback-input'
                            type='number'
                            name='stars'
                            onChange={updateStars}
                            value={stars}
                            id="stars"
                        ></input>
                    </label>
                </div>
                <button className="feedback-form-button" type='submit'>Leave Review</button>

            </form>
        </div>
    )

}
export default CreateReviewForm;

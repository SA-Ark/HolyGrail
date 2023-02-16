import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkCreateReview, thunkEditReview, thunkLoadSingleReview } from '../../store/reviews';
import Buttons from '../Buttons';
const { DeleteReviewButton } = Buttons;

const EditReviewForm = ({review, itemId}) => {
    const dispatch = useDispatch();
    const stateReview = useSelector(state=>state.reviews?.singleReview)
    const [reviewBody, setReviewBody] = useState(review?.review_body);
    const [stars, setStars] = useState(review?.stars);
    const [errors, setErrors] = useState([]);
    let [currReview, setCurrReview] = useState(review)
    // const [deleted, setDeleted] = useState(false)
    const [submitText, setSubmitText] = useState(review?.id ? "Edit Feedback": "Leave Feedback")
    // console.log(stateReview, stateReview?.review_body, stateReview?.stars, "STATE")

useEffect(()=>{
    if (!stateReview?.id){

        // setReviewBody("")
        // setStars(stateReview?.stars)
    }
}, [review, stateReview])
    // console.log(reviewBody, stars, "reviews")



    const onClick = ()=>{
        console.log("COMING IN")
    }
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

            if(currReview){
                // setStars(currReview.stars)
                // setReviewBody(currReview.review_body)
                const editReview = {
                    reviewBody: reviewBody,
                    stars
                }
                res = await dispatch(thunkEditReview(editReview, currReview?.id));


                    setStars(editReview.stars)
                    setReviewBody(editReview.reviewBody)
                    setCurrReview( {
                        id: currReview?.id,
                        review_body: newReview?.reviewBody,
                        stars
                    })

                }
                else {
                console.log(currReview, "CURR REVIEW")
               const data = await dispatch(thunkCreateReview(newReview, itemId))
                console.log(data, "DATA")

                // if (res?.ok){
                //     const data = await res?.json()

                //     console.log(data, "CREATE DATA")
                // }
                console.log(stateReview)
                setSubmitText("Edit Feedback")
                setStars(data?.stars)
                setReviewBody(data?.review_body)
                setCurrReview( {
                    id: data?.id,
                    review_body: reviewBody,
                    stars
                })

            }




        if (res?.ok) {
            const data = await res.json();
            console.log(data, "THIS DATA")
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
            <DeleteReviewButton setText={setSubmitText} setRev={setCurrReview} revBod={setReviewBody} star={setStars} reviewId={review?.id}/>
        </form>
    )
}

export default EditReviewForm;

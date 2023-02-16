import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import { thunkCreateReview, thunkEditReview, thunkLoadSingleReview } from '../../store/reviews';
import Buttons from '../Buttons';
const { DeleteReviewButton } = Buttons;
let prevReview = {}
const EditReviewForm = ({review, itemId}) => {
    const closeModal = useModal()
    const dispatch = useDispatch();
    const stateReview = useSelector(state=>state.reviews?.singleReview)
    const [reviewBody, setReviewBody] = useState("");
    const [stars, setStars] = useState("");
    const [errors, setErrors] = useState([]);
    let [currReview, setCurrReview] = useState("")
    const history = useHistory()
    // const [deleted, setDeleted] = useState(false)
    const [submitText, setSubmitText] = useState(review?.id ? "Edit Feedback": "Leave Feedback")
    // console.log(stateReview, stateReview?.review_body, stateReview?.stars, "STATE")
    // let starVal = review?.stars
    // let bodVal = review?.review_body
    console.log(reviewBody, "BOD")

useEffect(()=>{
    if(Object.keys(prevReview).length){
        setCurrReview(prevReview)
    }else{

        setCurrReview(review)
    }
            if (Object.keys(currReview).length){
                review = {...currReview}
                prevReview = {...currReview}

                setReviewBody(currReview?.review_body)
                setStars(currReview?.stars)
            }else{
                setReviewBody(review?.review_body)
                setStars(review?.stars)

            }

            if (Object.keys(prevReview).length){

                setReviewBody(prevReview?.review_body)
                setStars(prevReview?.stars)

            }

    }, [])

useEffect(()=>{

    // const body = document.getElementById("body");
    // const star = document.getElementById("stars")
    // body.value = reviewBody
    // star.value = stars
    // starVal = stars
    // bodVal = reviewBody
    console.log(prevReview, currReview, "REVS")
    console.log(reviewBody, "REVIEW")
    console.log("changed")



}, [reviewBody, stars])
    // console.log(reviewBody, stars, "reviews")


    const updateBody = (e)=>{

        setReviewBody(e.target.value)
        console.log(reviewBody, "REVIEWBODY")
        // bodVal = reviewBody

    }
    const updateStars = (e)=>{

        setStars(e.target.value)
        console.log(stars, "STARS")
        // starVal = stars


    }
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

            if(Object.keys(currReview).length){
                // setStars(currReview.stars)
                // setReviewBody(currReview.review_body)
                const editReview = {
                    reviewBody: reviewBody,
                    stars
                }
                const data = await dispatch(thunkEditReview(editReview, currReview?.id));

                console.log(data?.review, "res")

                    setStars(data?.review.stars)
                    setReviewBody(data?.review.review_body)
                    setCurrReview( {
                        id: currReview?.id,
                        review_body: data?.review?.review_body,
                        stars: data?.review?.stars
                    })
                    review = {
                        id: currReview?.id,
                        review_body: data?.review?.review_body,
                        stars: data?.review?.stars
                    }
                    prevReview ={
                        id: currReview?.id,
                        review_body: data?.review?.review_body,
                        stars: data?.review?.stars
                    }
                    console.log(prevReview, "PREV")

                    history.push("/dashboard/1")
                    // closeModal()
                    console.log(history, "HISTORY")
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
                review = {
                    id: currReview?.id,
                    review_body: data.review?.review_body,
                    stars: data.review?.stars
                }
                prevReview = {
                    id: currReview?.id,
                    review_body: data.review?.review_body,
                    stars: data.review?.stars
                }

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
            <button type='submit'>{submitText}</button>
            <DeleteReviewButton setText={setSubmitText} setRev={setCurrReview} revBod={setReviewBody} star={setStars} reviewId={review?.id}/>
        </form>
    )
}

export default EditReviewForm;

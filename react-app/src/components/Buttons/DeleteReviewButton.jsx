import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { thunkDeleteReview, thunkLoadCurrReviews, thunkLoadSingleReview } from '../../store/reviews';

const DeleteReviewButton = ({reviewId, revBod, star, setRev, setText}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    let [review, setReview] = useState(store => store?.reviews?.singleReview)
    let [user, setUser] = useState(store => store?.session?.user)
    let userId = user?.id



    useEffect(() => {
        if (reviewId){

            dispatch(thunkLoadSingleReview(reviewId))
        }
    }, [review, userId, dispatch])

    const deleteItem = async (e) => {
        e.preventDefault();
        setErrors([])
        if (reviewId){

            const res = await dispatch(thunkDeleteReview(reviewId))



                revBod("")
                star("")
                setRev("")
                setText("Leave Feedback")
                history.push('/dashboard/1')




        }
        // await dispatch(thunkLoadCurrReviews(userId))
        // history.push(`/dashboard/${userId}`)
    }

    return (
        <>

            <button type='button' onClick={deleteItem} >Delete</button>
        </>
    )
};

export default DeleteReviewButton

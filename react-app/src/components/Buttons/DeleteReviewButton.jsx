import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { thunkDeleteReview, thunkLoadSingleReview } from '../../store/reviews';

const DeleteReviewButton = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    let review = useState(store => store?.reviews?.singleReview)
    let user = useState(store => store?.session?.user)
    let userId = user?.id
    const { reviewId } = useParams();

    useEffect(() => {
        dispatch(thunkLoadSingleReview(reviewId))
    }, [reviewId, userId, dispatch])

    const deleteItem = (e) => {
        e.preventDefault();
        setErrors([])
        const res = dispatch(thunkDeleteReview(reviewId))
        if (res.ok) {
            history.push('/items')
        }
    }

    return (
        <>
            <button type='button' onClick={deleteItem}>Delete</button>
        </>
    )
};

export default DeleteReviewButton

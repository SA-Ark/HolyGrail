import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { thunkDeleteReview, thunkLoadSingleReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
const DeleteReviewButton = ({onDel, reviewId}) => {
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])

    const deleteItem = async (e) => {
        e.preventDefault();
        setErrors([])
        if (reviewId){

            const res = await dispatch(thunkDeleteReview(reviewId))

                onDel()
                closeModal()
                history.push('/dashboard/1')

        }
    }

    return (
        <>
            <button type='button' onClick={deleteItem}>Delete</button>
        </>
    )
};

export default DeleteReviewButton

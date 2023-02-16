import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { thunkLoadOrders } from '../../store/payments';

//NOT DONE. WILL DO WHEN DOING PAYMENT FLEX GOALS

const DeletePayButton = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    let orders = useState(store => store?.payments)
    let user = useState(store => store?.session?.user)
    let userId = user?.id


    useEffect(() => {
        dispatch(thunkLoadOrders(itemId, userId))
    }, [itemId, userId, dispatch])

    const deleteItem = (e) => {
        e.preventDefault();
        setErrors([])
        const res = dispatch(thunkLoadOrders(itemId))
        if (res.ok) {
            history.push('/payments')
        }
    }

    return (
        <>
            <button type='button' onClick={deleteItem}>Delete</button>
        </>
    )
};

export default DeletePayButton

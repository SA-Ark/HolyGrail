import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { thunkDeleteItem, thunkLoadSingleItem } from '../../store/items';

const DeleteItemButton = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    let item = useState(store => store?.items?.singleItem)
    let user = useState(store => store?.session?.user)
    let userId = user?.id
    const { itemId } = useParams();

    useEffect(() => {
        dispatch(thunkLoadSingleItem(itemId, userId))
    }, [itemId, userId, dispatch])

    const deleteItem = async (e) => {
        e.preventDefault();
        setErrors([])
        const res = await dispatch(thunkDeleteItem(itemId))
        if (res?.ok) {
        }
        history.push(`/dashboard/${userId}`)
    }

    return (
        <>
            <button className='feedback-button' type='button' onClick={deleteItem}>Delete</button>
        </>
    )
};

export default DeleteItemButton

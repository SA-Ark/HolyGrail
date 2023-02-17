import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { thunkDeleteItem, thunkLoadSingleItem } from '../../store/items';

const DeleteItemButton = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    let item = useSelector(store => store?.items?.singleItem)
    let user = useSelector(store => store?.session?.user)
    let userId = user?.id
    const { itemId } = useParams();
    let id = null
    console.log('user id -->',user?.id)
    if (user?.id) {
        id = user?.id +1
    }
    useEffect(() => {
        dispatch(thunkLoadSingleItem(itemId, userId))
    }, [itemId, userId, dispatch])

    const deleteItem = async (e) => {
        e.preventDefault();
        setErrors([])
        const res = await dispatch(thunkDeleteItem(itemId))
        if (res?.ok) {
        }
        if (id) history.push(`/favorites/${user?.id}`)
    }

    return (
        <>
            <button className='feedback-button' type='button' onClick={deleteItem}>Delete</button>
        </>
    )
};

export default DeleteItemButton

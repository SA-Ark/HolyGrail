import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { thunkDeleteItem, thunkLoadSingleItem } from '../../store/items';


export default function DeleteButton() {
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

    const deleteItem = (e) => {
        e.preventDefault();
        setErrors([])
        const res = dispatch(thunkDeleteItem(itemId))
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
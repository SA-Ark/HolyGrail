import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { thunkDeleteFavorite, thunkLoadFavorites } from '../../store/favorites';

const DeleteLikeButton = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    let favorites = useState(store => store?.favorites?.allFavorites)
    let user = useState(store => store?.session?.user)
    let userId = user?.id
    const { itemId } = useParams();

    useEffect(() => {
        dispatch(thunkLoadFavorites())
    }, [itemId, userId, dispatch])

    const deleteItem = (e) => {
        e.preventDefault();
        setErrors([])
        const res = dispatch(thunkDeleteFavorite(itemId))
        if (res.ok) {
            history.push('/favorites')
        }
    }

    return (
        <>
            <button type='button' onClick={deleteItem}>Delete</button>
        </>
    )
};

export default DeleteLikeButton

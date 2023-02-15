import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { thunkDeleteFavorite, thunkLoadFavorites } from '../../store/favorites';
import { thunkLoadItems } from '../../store/items';

const DeleteLikeButton = ({itemId}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    let favorites = useState(store => store?.favorites?.allFavorites)
    let user = useState(store => store?.session?.user)
    let userId = user?.id
    // const { itemId } = useParams();

    // useEffect(() => {
    //     dispatch(thunkLoadFavorites())
    // }, [userId, dispatch])


    const deleteItem = async (e) => {
        e.preventDefault();
        setErrors([])
        await dispatch(thunkDeleteFavorite(itemId)).then(() => dispatch(thunkLoadItems()))

        // dispatch(thunkLoadFavorites())
        // if (res.ok) {
        //     history.push('/favorites')
        // }
    }

    return (
        <>
            <button type='button' onClick={deleteItem}>❤️</button>
        </>
    )
};

export default DeleteLikeButton

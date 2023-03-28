import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { thunkCreateFavorite, thunkLoadFavorites, thunkDeleteFavorite } from '../../store/favorites';
import {  thunkLoadSingleItem } from '../../store/items';
import RedirectToLoginModal from '../RedirectToLoginModal'

const UnlikeButton = ({ itemId, liked, changeLike }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    const [like, setLike] = useState(liked)
    let favorites = useSelector(state => state?.favorites?.allFavorites)
	const user = useSelector(state => state.session.user);
    let userId = user?.id
    // const { itemId } = useParams();

    const likeFunc = async (e) => {
        e.preventDefault();
        setErrors([])
        if (like) await dispatch(thunkDeleteFavorite(itemId))
        else await dispatch(thunkCreateFavorite(itemId))

        setLike(!like)
        //come back to this for flex
        await dispatch(thunkLoadFavorites())
        const data = await dispatch(thunkLoadSingleItem(itemId, userId))
        changeLike(data)
    }

    return (
        <>
            {!user?.id && (
                <RedirectToLoginModal />
            )}
            {(
                <button className='like-button icon-button' type='button' onClick={likeFunc}>
                    <i className="fa-solid fa-heart like-icon"></i>
                </button>
            )}

        </>
    )
}

export default UnlikeButton

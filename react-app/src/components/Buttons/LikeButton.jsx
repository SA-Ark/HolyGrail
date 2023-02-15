import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { thunkCreateFavorite, thunkLoadFavorites, thunkDeleteFavorite } from '../../store/favorites';
import { thunkLoadItems, thunkLoadSingleItem } from '../../store/items';
import RedirectToLoginModal from '../RedirectToLoginModal'

const LikeButton = ({ itemId, liked }) => {
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
        // dispatch(thunkLoadItems(userId))
        setLike(!like)
        //come back to this for flex
        await dispatch(thunkLoadFavorites())

    }

    return (
        <>
            {!user?.id && (
                <RedirectToLoginModal />
            )}
            {like && user?.id && (
                <button className='like-button' type='button' onClick={likeFunc}>
                    ❤️Unlike❤️
                </button>
            )}
            {!like && user?.id && (
                <button className='like-button' type='button' onClick={likeFunc}>
                    Like
                </button>
            )}
        </>
    )
}

export default LikeButton

import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { thunkCreateFavorite, thunkLoadFavorites } from '../../store/favorites';
import { thunkLoadItems } from '../../store/items';

const CreateLikeButton = ({itemId, liked}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [errors, setErrors] = useState([])
    const [like, setLike] = useState(liked)
    let favorites = useState(store => store?.favorites?.allFavorites)
    let user = useState(store => store?.session?.user)
    let userId = user?.id
    // const { itemId } = useParams();

    // useEffect(() => {
    //     dispatch(thunkLoadFavorites())

    // }, [favorites])

    const likeFunc = async (e) => {
        e.preventDefault();
        setErrors([])
        setLike(!like)
        if (like)
        await dispatch(thunkCreateFavorite(itemId))

        // if (res.ok) {
        //     history.push('/favorites')
        // }
    }

    return (
        <>
            <button type='button' onClick={createLike}>
                {
                    liked
                        ? "💔"
                        : "❤️"
                }
            </button>
        </>
    )
};

export default CreateLikeButton

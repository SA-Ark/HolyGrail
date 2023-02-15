import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import { thunkCreateFavorite, thunkLoadFavorites, thunkDeleteFavorite } from '../../store/favorites';
import { thunkLoadItems, thunkLoadSingleItem } from '../../store/items';

const LikeButton = ({itemId, liked}) => {
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
        if (like) await dispatch(thunkDeleteFavorite(itemId))
        else await dispatch(thunkCreateFavorite(itemId))
        // dispatch(thunkLoadItems(userId))
        setLike(!like)
        await dispatch(thunkLoadSingleItem(1))

    }

    // return (
        // <>
        //     <button type='button' onClick={likeFunc}>
        //         {
        //             liked
        //                 ? "❤️Unlike❤️"
        //                 : "Like"
        //         }
        //     </button>
        // </>

    // )
    if (like){

    return (
        <>
        <button type='button' onClick={likeFunc}>
        ❤️Unlike❤️
        </button>
    </>
    )
}else{
    return (
        <>
        <button type='button' onClick={likeFunc}>
        Like
        </button>
    </>
    )
}
};

export default LikeButton

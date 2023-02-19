import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkCreateFavorite, thunkLoadFavorites, thunkDeleteFavorite } from '../../store/favorites';
import RedirectToLoginModal from '../RedirectToLoginModal'

const LikeButton = ({item, setFavoritesUpdated}) => {
    const dispatch = useDispatch()
	const user = useSelector(state => state.session.user);

    const like = async (e) => {
        e.preventDefault();
        await dispatch(thunkCreateFavorite(item?.id));
        setFavoritesUpdated(true);
    };


    return (
        <>
            {!user?.id && <RedirectToLoginModal />}

            {
            user?.id &&
                <button className='like-button icon-button' type='button' onClick={like}>
                    <i className="fa-regular fa-heart icon-button"></i>
                </button>
            }
        </>
    )
}

export default LikeButton

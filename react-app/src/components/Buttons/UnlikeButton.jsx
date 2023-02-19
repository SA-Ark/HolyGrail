import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkDeleteFavorite } from '../../store/favorites';
import RedirectToLoginModal from '../RedirectToLoginModal'

const UnlikeButton = ({item, setFavoritesUpdated}) => {
    const dispatch = useDispatch()
	const user = useSelector(state => state.session.user);

    const unLike = async (e) => {
        e.preventDefault();
        await dispatch(thunkDeleteFavorite(item?.id));
        setFavoritesUpdated(true);
    };

    return (
        <>
            {!user?.id && <RedirectToLoginModal />}
            {
                <button className='like-button icon-button' type='button' onClick={unLike}>
                    <i className="fa-solid fa-heart like-icon"></i>
                </button>
            }

        </>
    )
}

export default UnlikeButton

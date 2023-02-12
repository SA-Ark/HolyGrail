import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkLoadReviews } from '../../../store/reviews';
import FeedbackTab from './FeedbackTab';
import AvailableListings from './AvailableListings';
import { thunkLoadItems } from '../../../store/items';
import * as utils from '../../../store/utils';

import "./PublicProfile.css"

const PublicProfile = () => {
    const dispatch = useDispatch();
    const reviews = utils.deNormalize(useSelector(state => state?.reviews?.allReviews));
    const userId = useSelector(state => state?.session?.user?.id);
    const items = utils.deNormalize(useSelector(state => state?.items?.allItems));
    let userItems = [];
    for (let item in items) {
        if (item.user_id === userId) {
            userItems.push(item);
        }
    }

    useEffect(() => {
        dispatch(thunkLoadReviews(userId))
        dispatch(thunkLoadItems())
    }, [dispatch, userId])

    return (
        <>
            <div className="profile-header">
                <img src="" alt="" />
                <div className="join-in"></div>
                <div className="stars"></div>
                <div className="transactions-count"></div>
                <div className="followers"></div>
            </div>
            <div className="subheader-1">
                <div className="listings"></div>
                <div className="feedback"></div>
                <div className="country"></div>
                <div className="size-weight"></div>
            </div>
            <div className="subheader-2">
                <div className="listings-general-info"></div>
            </div>
            <div className="profile-tabs-container">
                {/* Put feedback tab here */}
                <FeedbackTab reviews={reviews} />
                <AvailableListings items={userItems} />
            </div>
        </>
    )
}


export default PublicProfile;
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { thunkLoadReviews } from '../../../store/reviews';
import FeedbackTab from './FeedbackTab';
import AvailableListings from './AvailableListings';
import { thunkLoadItems } from '../../../store/items';
import {deNormalize, getUserItems, getUserReviews} from '../../../store/utils';


import "./PublicProfile.css"

const PublicProfile = () => {

    const dispatch = useDispatch();
    const reviews = useSelector(state => state?.reviews?.allReviews);
    const userId = useSelector(state => state?.session?.user?.id);
    const items = useSelector(state => state?.items?.allItems);

    const [profileReviews, setProfileReviews] = useState("")
    const [ availableListings, setAvailableListings] = useState("")

    // let profileReviewsTwo = getUserReviews(deNormalize(reviews))
    // let availableListingsThree = getUserItems(deNormalize(items), userId)

    // const reviewfunc = async () => {
    //     let data
    //     return await dispatch(thunkLoadReviews(userId)).then((res) => res.json())

    // }


    useEffect(() => {
        // const reviews = reviewfunc()
        dispatch(thunkLoadReviews(userId))
        dispatch(thunkLoadItems(userId))
        if (reviews) setProfileReviews(getUserReviews(deNormalize(reviews), userId))
        if (items) setAvailableListings(getUserItems(deNormalize(items), userId))

    }, [dispatch, userId, reviews])




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
                {/* !@#$% Might need to add logic here if rendering issues, but I think I got the
                general compnent to render even with server errors  */}

                {
                    reviews?.length ?
                    <FeedbackTab reviews={profileReviews} />
                    : null
                }
                <AvailableListings items={availableListings} />


            </div>
        </>
    )
}

export default PublicProfile;

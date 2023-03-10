import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkLoadCurrReviews } from "../../../store/reviews";
import './ProfileCard.css'

const ProfileCard = ({user}) => {
    const dispatch = useDispatch();
    const reviews = useSelector(state => state?.reviews?.allReviews);

    const avg_star_rating = () => {
        if (reviews.avg_star_rating === 5) return "★★★★★";
        if (reviews.avg_star_rating === 4) return "★★★★";
        if (reviews.avg_star_rating === 3) return "★★★";
        if (reviews.avg_star_rating === 2) return "★★";
        else return "★";
    }

    useEffect(() => {
        dispatch(thunkLoadCurrReviews(user?.id));
    }, [dispatch, user?.id]);

    return (
        <>
            <div className="prof-card-container">
                <div className="profile-image">
                    <i className="fa-solid fa-circle-user"></i>
                </div>
                <div className="user-info-container">
                    <div className="prof-card-user">{user?.username}</div>
                    <div className="prof-card-rating">
                        {avg_star_rating()}  {reviews?.num_reviews} reviews
                    </div>
                    <div className="prof-card-transaction">
                        {reviews?.total_transactions} Transactions • {reviews?.items_listed} items for sale
                    </div>
                    <div className="prof-card-items">
                    </div>
                    {/* <div>
                        SELLER BADGES HERE
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default ProfileCard;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkLoadCurrReviews } from "../../../store/reviews";
import './ProfileCard.css'

const ProfileCard = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const reviews = useSelector(state => state?.reviews?.allReviews);
console.log('user', user)
console.log("REVIEWS ===>", reviews);

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

                <div className="prof-card-user">{user?.username}</div>
                <div className="prof-card-rating">
                    {avg_star_rating()}  {reviews?.num_reviews} reviews
                </div>
                <div className="prof-card-transaction">
                    {reviews?.total_transactions} Transactions • {reviews?.items_listed} items for sale
                </div>
                <div className="prof-card-items">
                {/* <i class="fa-solid fa-boxes-packing"></i> */}
                </div>
                {/* <div>
                    SELLER BADGES HERE
                </div> */}
            </div>
        </>
    )
}

export default ProfileCard;

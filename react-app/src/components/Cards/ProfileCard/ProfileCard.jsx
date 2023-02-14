import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkLoadCurrReviews } from "../../../store/reviews";

const ProfileCard = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const reviews = useSelector(state => state?.reviews?.allReviews);


    const avg_star_rating = () => {
        if (reviews.avg_star_rating === 5) return "⭐️⭐️⭐️⭐️⭐️";
        if (reviews.avg_star_rating === 4) return "⭐️⭐️⭐️⭐️";
        if (reviews.avg_star_rating === 3) return "⭐️⭐️⭐️";
        if (reviews.avg_star_rating === 2) return "⭐️⭐️";
        else return "⭐️";
    }

    useEffect(() => {
        dispatch(thunkLoadCurrReviews(user?.id));
    }, [dispatch, user.id]);

    return (
        <>
            <div className="profile-card-container">
                PROFILE CARD
                <div>
                    {avg_star_rating()}
                </div>
                <div>
                    {reviews.num_reviews} reviews
                </div>
                <div>
                    {reviews.total_transactions} Transactions
                </div>
                <div>
                    {reviews.items_listed} items for sale
                </div>
                {/* <div>
                    SELLER BADGES HERE
                </div> */}
            </div>
        </>
    )
}

export default ProfileCard;
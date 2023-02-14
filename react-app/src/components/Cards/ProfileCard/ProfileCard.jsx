import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkLoadCurrReviews } from "../../../store/reviews";

const ProfileCard = ({ item }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const reviews = useSelector(state => state?.reviews?.allReviews);
    // console.log("ITEM --->", item);
    // console.log('USER --->', user);
    // console.log("REVIEWS --->", reviews);

    useEffect(() => {
        dispatch(thunkLoadCurrReviews(user?.id));
    }, [dispatch, user.id]);

    return (
        <>
            <div className="profile-card-container">
                <div>
                    {reviews.avg_rating} SELLER AVG STAR RATING HERE
                </div>
                <div>
                    {reviews.num_reviews} NUM SELLER REVIEWS HERE
                </div>
                <div>
                    {reviews.num_transactions} Transactions
                </div>
                <div>
                    {reviews.items_for_sale} items for sale
                </div>
                <div>
                    SELLER BADGES HERE
                </div>
            </div>
        </>
    )
}

export default ProfileCard;
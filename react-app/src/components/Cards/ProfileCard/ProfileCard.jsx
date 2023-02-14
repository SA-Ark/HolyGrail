//This will live on single item page
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkLoadCurrReviews } from "../../../store/reviews";

const ProfileCard = ({ item }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const reviews = useSelector(state => state?.reviews?.allReviews);
    console.log("ITEM --->", item);
    console.log('USER --->', user);
    console.log("REVIEWS --->", reviews);

    useEffect(() => {
        dispatch(thunkLoadCurrReviews(user?.id));
    }, [dispatch, user.id]);

    return (
        <>
            <div>
                {}
            </div>
            <div>
                Seller Stars
            </div>
        </>
    )
}

export default ProfileCard;
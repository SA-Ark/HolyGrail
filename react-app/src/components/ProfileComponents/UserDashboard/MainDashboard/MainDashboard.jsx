import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkLoadFavorites } from '../../../../store/favorites'
import { thunkLoadItems } from '../../../../store/items'
import { thunkLoadOrders } from '../../../../store/payments'
import { thunkLoadReviews } from '../../../../store/reviews'
import Tabs from '../Tabs'
import { getUserFavoriteItems, getUserPurchases, switchTab } from '../../../../store/utils'
const {PurchasesTab, EditProfileTab, FavoritesTab, AvailableListingsTab, FeedbackTab} = Tabs

const MainDashboard = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state?.session?.user)
    const items = useSelector(state => state?.items?.allItems)
    const favorites = useSelector(state => state?.favorites?.allFavorites)
    const purchases = useSelector(state => state?.payments?.allOrders)
    const reviews = useSelector(state => state?.reviews?.allReviews);
    const userId = user?.id


    useEffect(() => {
        dispatch(thunkLoadItems())
        dispatch(thunkLoadFavorites())
        dispatch(thunkLoadOrders(user?.id))
        dispatch(thunkLoadReviews(userId))

    }, [dispatch, user]);

    return (
        <>
        <div className="tab-container">
        <PurchasesTab purchases={purchases}/>
        <h1>-------------------------</h1>
        <EditProfileTab user={user}/>
        <h1>-------------------------</h1>
        <FavoritesTab favoriteItems={favorites}/>
        </div>
        <h1>-------------------------</h1>
        <AvailableListingsTab items={items}/>
        <h1>-------------------------</h1>
        <FeedbackTab reviews = {reviews} />
        </>
    )
}

export default MainDashboard;

import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkLoadFavorites } from '../../../../store/favorites'
import { thunkLoadItems } from '../../../../store/items'
import { thunkLoadOrders } from '../../../../store/payments'
import { thunkLoadReviews } from '../../../../store/reviews'
import Tabs from '../Tabs'
import { getUserFavoriteItems, getUserPurchases, switchTab } from '../../../../store/utils'
const { PurchasesTab, EditProfileTab, FavoritesTab, AvailableListingsTab, FeedbackTab } = Tabs

const MainDashboard = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state?.session?.user)
    const items = useSelector(state => state?.items?.allItems)
    const favorites = useSelector(state => state?.favorites?.allFavorites)
    const purchases = useSelector(state => state?.payments?.allOrders)
    const reviews = useSelector(state => state?.reviews?.allReviews);
    const userId = user?.id
    const [selectedTab, setSelectedTab] = useState('AvailableListingsTab');

    useEffect(() => {
        dispatch(thunkLoadItems())
        dispatch(thunkLoadFavorites())
        dispatch(thunkLoadOrders(user?.id))
        dispatch(thunkLoadReviews(userId))

    }, [dispatch, user]);

    const rating = parseFloat(reviews.avg_star_rating).toFixed(1)

    return (
        <div className='user-dashboard-container'>
            <div className="profile-header">
                <img src="" alt="" />
                <div>{user.username}</div>
                <div className="profile-joined-in">Joined on {user.created_at}</div>
                <div className="profile-stars">★{rating}</div>
                <div className="profile-transactions-count">{reviews.total_transactions}</div>
                <div className="profile-followers"></div>
                <button className='edit-profile-button' onClick={() => setSelectedTab('EditProfileTab')}>Edit Profile</button>
            </div>
            <div className="tab-container">
                <div className='purchases-tab' onClick={() => setSelectedTab('PurchasesTab')}>Purchases</div>
                <div className='favorites-tab' onClick={() => setSelectedTab('FavoritesTab')}>Favorites</div>
                <div className='available-listings-tab' onClick={() => setSelectedTab('AvailableListingsTab')}>Available Listings</div>
                <div className='feedback-tab' onClick={() => setSelectedTab('FeedbackTab')}>Feedback</div>
            </div>
            <div>
                {selectedTab === 'PurchasesTab' && <PurchasesTab purchases={purchases} />}
                {selectedTab === 'EditProfileTab' && <EditProfileTab user={user} />}
                {selectedTab === 'FavoritesTab' && <FavoritesTab favoriteItems={favorites} />}
                {selectedTab === 'AvailableListingsTab' && <AvailableListingsTab items={items} />}
                {selectedTab === 'FeedbackTab' && <FeedbackTab reviews={reviews} />}
            </div>
        </div>

    )
}

export default MainDashboard;

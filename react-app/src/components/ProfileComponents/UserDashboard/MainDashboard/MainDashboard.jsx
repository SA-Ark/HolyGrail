import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkLoadFavorites } from '../../../../store/favorites'
import { thunkLoadItems } from '../../../../store/items'
import { thunkLoadOrders } from '../../../../store/payments'
import { thunkLoadReviews } from '../../../../store/reviews'
import Tabs from '../Tabs'
import './MainDashboard.css'
import { getUserFavoriteItems, getUserPurchases, switchTab, dbDateToMonthYear } from '../../../../store/utils'
import FeatureComingSoonModal from '../../../FeatureComingSoonModal'
const { PurchasesTab, EditProfileTab, FavoritesTab, AvailableListingsTab, FeedbackTab } = Tabs

const MainDashboard = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state?.session?.user)
    const items = useSelector(state => state?.items?.allItems)
    const favorites = useSelector(state => state?.favorites?.allFavorites)
    const purchases = useSelector(state => state?.payments?.allOrders)
    const reviews = useSelector(state => state?.reviews?.allReviews);
    const userId = user?.id
    const [selectedTab, setSelectedTab] = useState('PurchasesTab');

    useEffect(() => {
        dispatch(thunkLoadItems(user?.id))
        dispatch(thunkLoadFavorites())
        dispatch(thunkLoadOrders(user?.id))
        dispatch(thunkLoadReviews(userId))

    }, [dispatch, user]);

    const rating = parseFloat(reviews?.avg_star_rating).toFixed(1)

    return (
        <>
            <div className='user-dash-container'>
                <div className="dashboard-banner">
                    <div className="profile-header">
                        <div className='prof-icon-container'>
                            <i className="fa-solid fa-circle-user"></i>
                            <div className='joined-in-container'>
                                <div className='profile-username'>{user.username}</div>
                                <span className='joined-on'>Joined on {dbDateToMonthYear(user.created_at)}</span>
                            </div>
                        </div>
                        <div className='stars-container'>
                            <div className="profile-stars">
                                {!rating ? null : `★${rating}`}
                            </div>
                            <div className='total-reviews'>
                                {reviews?.num_reviews} {reviews?.num_reviews === 1 ? 'Review' : 'Reviews'}                    </div>
                        </div>
                        <div className='transaction-container'>
                            <div className="profile-transactions-count">
                                {!reviews?.total_transactions ? 'No transactions' : reviews?.total_transactions}
                            </div>
                            <span className='transactions'>Transactions</span>
                        </div>
                    <div className='edit-button-container'>
                        <FeatureComingSoonModal />
                        {/* <button className='profile-edit feedback-button' onClick={() => setSelectedTab('EditProfileTab')}>Edit Profile</button> */}
                    </div>
                    </div>
                </div>
                <div className="tab-container">
                    <div className='purchases-tab' onClick={() => setSelectedTab('PurchasesTab')}>Purchases</div>
                    <div className='favorites-tab' onClick={() => setSelectedTab('FavoritesTab')}>Favorites</div>
                    <div className='available-listings-tab' onClick={() => setSelectedTab('AvailableListingsTab')}>Your Listings</div>
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
        </>

    )
}

export default MainDashboard;

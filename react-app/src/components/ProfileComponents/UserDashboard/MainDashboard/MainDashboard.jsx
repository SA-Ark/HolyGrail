import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkLoadFavorites } from '../../../../store/favorites'
import { thunkLoadItems } from '../../../../store/items'
import { thunkLoadOrders } from '../../../../store/payments'
import { thunkLoadReviews } from '../../../../store/reviews'
import Tabs from '../Tabs'
import './MainDashboard.css'
import { getUserFavoriteItems, getUserPurchases, switchTab, dbDateToMonthYear } from '../../../../store/utils'
import FeatureComingSoonModal from '../../../ComingSoonModals/FeatureComingSoonModal'
import { useHistory } from 'react-router-dom'
const { PurchasesTab, EditProfileTab, FavoritesTab, AvailableListingsTab, FeedbackTab } = Tabs

const MainDashboard = ({ tabOverride }) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const user = useSelector(state => state?.session?.user)
    const items = useSelector(state => state?.items?.allItems)
    const favorites = useSelector(state => state?.favorites?.allFavorites)
    const purchases = useSelector(state => state?.payments?.allOrders)
    const reviews = useSelector(state => state?.reviews?.allReviews);
    const userId = user?.id
    const [selectedTab, setSelectedTab] = useState(tabOverride ? tabOverride : 'AvailableListingsTab');
    const [favoritesUpdated, setFavoritesUpdated] = useState(false);

    const handleTabClick = (tabName) => {
        setSelectedTab(tabName);
    }

    useEffect(() => {

        if (selectedTab === 'PurchasesTab') {
            history.push(`/purchases/${userId}`);
        }
        if (selectedTab === 'FavoritesTab') {
            history.push(`/favorites/${userId}`);
        }
        if (selectedTab === 'AvailableListingsTab') {
            history.push(`/available-listings/${userId}`);
        }
        if (selectedTab === 'FeedbackTab') {
            history.push(`/feedback/${userId}`);
        }

        dispatch(thunkLoadItems(user?.id))
        dispatch(thunkLoadFavorites())
        dispatch(thunkLoadOrders(user?.id))
        dispatch(thunkLoadReviews(userId))
        setFavoritesUpdated(false)

    }, [dispatch, user, selectedTab, favoritesUpdated]);

    const rating = parseFloat(reviews?.avg_star_rating).toFixed(1)
    console.log('reviews -->', reviews)
    console.log('rating -->', rating)
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
                                {isNaN(rating) ? 'No reviews' : `★${rating}`}
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
                    <div
                        className={`purchases-tab ${selectedTab === 'PurchasesTab' ? 'selected' : ''}`}
                        onClick={() => handleTabClick('PurchasesTab')}
                    >
                        Purchases
                    </div>
                    <div
                        className={`favorites-tab ${selectedTab === 'FavoritesTab' ? 'selected' : ''}`}
                        onClick={() => handleTabClick('FavoritesTab')}
                    >
                        Favorites
                    </div>
                    <div
                        className={`available-listings-tab ${selectedTab === 'AvailableListingsTab' ? 'selected' : ''}`}
                        onClick={() => handleTabClick('AvailableListingsTab')}
                    >
                        Your Listings
                    </div>
                    <div
                        className={`feedback-tab ${selectedTab === 'FeedbackTab' ? 'selected' : ''}`}
                        onClick={() => handleTabClick('FeedbackTab')}
                    >
                        Feedback
                    </div>
                </div>
                <div>
                    {selectedTab === 'PurchasesTab' && <PurchasesTab purchases={purchases} />}
                    {selectedTab === 'EditProfileTab' && <EditProfileTab user={user} />}
                    {selectedTab === 'FavoritesTab' && <FavoritesTab favoriteItems={favorites} setFavoritesUpdated={setFavoritesUpdated} />}
                    {selectedTab === 'AvailableListingsTab' && <AvailableListingsTab items={items} />}
                    {selectedTab === 'FeedbackTab' && <FeedbackTab reviews={reviews} />}
                </div>
            </div>
        </>

    )
}

export default MainDashboard;

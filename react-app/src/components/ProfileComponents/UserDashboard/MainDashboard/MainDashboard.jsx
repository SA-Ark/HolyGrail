import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { thunkLoadFavorites } from '../../../../store/favorites'
import { thunkLoadItems } from '../../../../store/items'
import { thunkLoadOrders } from '../../../../store/payments'
import Tabs from '../Tabs'
import { getUserFavoriteItems, switchTab } from '../../../../store/utils'
const {AddressesTab, MessagesTab, NotificationsTab, PurchasesTab, EditProfileTab, SizesTab, FavoritesTab} = Tabs


const MainDashboard = () => {
    const dispatch = useDispatch()
    // const purchases = useSelector(state => state.orders.userOrders) !@#$ this needs configured with new store thunk
    const user = useSelector(state => state?.session?.user)
    const items = useSelector(state => state?.items?.allItems)
    const favorites = useSelector(state => state?.favorites?.allFavorites)
    const purchases = useSelector(state => state?.payments?.allOrders)

    const userFavoriteItems = getUserFavoriteItems(favorites, items)
    console.log(userFavoriteItems, "userfavoriteitems")


    useEffect(() => {
        dispatch(thunkLoadItems())
        dispatch(thunkLoadFavorites())
        // dispatch(thunkLoadOrders(user?.id))
    }, [dispatch, user]);

    return (
        <>
        <h1>
        </h1>
        <div className="tab-container">
        <PurchasesTab purchases={purchases}/>
        <h1>-------------------------</h1>
        <EditProfileTab user={user}/>
        <h1>-------------------------</h1>
        <FavoritesTab items={userFavoriteItems}/>
        </div>
        </>
    )
}

export default MainDashboard;

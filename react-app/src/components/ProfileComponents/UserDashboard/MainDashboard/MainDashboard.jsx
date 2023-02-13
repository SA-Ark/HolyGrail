import { useSelector, useDispatch } from 'react-redux'
import Tabs from '../Tabs'
const {AddressesTab, MessagesTab, NotificationsTab, PurchasesTab, EditProfileTab, SizesTab, FavoritesTab} = Tabs




const MainDashboard = () => {
    const dispatch = useDispatch()
    // const purchases = useSelector(state => state.orders.userOrders) !@#$ this needs configured with new store thunk

    return (
        <>
        <h1>
        </h1>
        <div className="tab-container">
        <PurchasesTab/>
        <h1>-------------------------</h1>
        <EditProfileTab/>
        <h1>-------------------------</h1>
        <FavoritesTab/>
        </div>
        </>
    )

}

export default MainDashboard;

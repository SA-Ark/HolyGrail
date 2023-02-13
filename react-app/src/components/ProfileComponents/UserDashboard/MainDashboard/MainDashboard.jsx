import Tabs from '../Tabs'
const {AddressesTab, MessagesTab, NotificationsTab, PurchasesTab, EditProfileTab, SizesTab, FavoritesTab} = Tabs

const MainDashboard = () => {
    return (
        <>
    <PurchasesTab/>
    <EditProfileTab/>
    <FavoritesTab/>
        </>
    )

}

export default MainDashboard;

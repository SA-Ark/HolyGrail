import Tabs from '../Tabs'
const {AddressesTab, MessagesTab, NotificationsTab, PurchasesTab, EditProfileTab, SizesTab} = Tabs

const MainDashboard = () => {
    return (
        <>
            <PurchasesTab />
            <EditProfileTab />
        </>
    )

}

export default MainDashboard;

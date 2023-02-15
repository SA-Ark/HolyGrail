import EditProfileTab from "../ProfileComponents/UserDashboard/Tabs/EditProfileTab";

const EditProfileButton = () => {

    function showEditProfile() {
        <EditProfileTab />
    }

    return (
        <>
            <button onClick={showEditProfile} type="button">Edit Profile</button>
        </>
    )
}

export default EditProfileButton;
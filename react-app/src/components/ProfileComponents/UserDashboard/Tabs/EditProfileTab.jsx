const EditProfileTab = () => {
    return (
        // "Edit profile tab - display edit user info form here"
        <form>
            <label>Edit Your Profile</label>
            <div>
                <label>Username</label>
                <input
                    type='text'
                    // onChange={}
                    // value={}
                    required
                ></input>
            </div>
            <div>
                <label>Email</label>
                <input
                    type='text'
                    // onChange={}
                    // value={}
                    required
                ></input>
            </div>
            <div>
                <label>Country/Location</label>
                <input
                    type='text'
                    // onChange={}
                    // value={}
                    required
                ></input>
            </div>
            <div>
                <label>Height</label>
                <input
                    type='text'
                    // onChange={}
                    // value={}
                    required
                ></input>
            </div>
            <div>
                <label>Weight</label>
                <input
                    type='text'
                    // onChange={}
                    // value={}
                    required
                ></input>
            </div>
            <div>
                <label>Bio</label>
                <input
                    type='textarea'
                    // onChange={}
                    // value={}
                    required
                ></input>
            </div>
            <button type="submit">Update</button>
        </form>
    )
}


export default EditProfileTab;

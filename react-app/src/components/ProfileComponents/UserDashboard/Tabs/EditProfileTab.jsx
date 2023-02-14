import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const EditProfileTab = () => {
    const user = useSelector(state => state.session?.user);


    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [country, setCountry] = useState(user.country);
    // const [height, setHeight] = useState(user.height);
    // const [weight, setWeight] = useState(user.weight);
    // const [bio, setBio] = useState(user.bio);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const profileUpdates = [
            username,
            email,
            country,
            // height,
            // weight,
            // bio
        ]
    }


    return (
        // "Edit profile tab - display edit user info form here"
        <form>
            <label>Edit Your Profile</label>
            <div>
                <label>Username</label>
                <input
                    type='text'
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                ></input>
            </div>
            <div>
                <label>Email</label>
                <input
                    type='text'
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                ></input>
            </div>
            <div>
                <label>Country/Location</label>
                <input
                    type='text'
                    onChange={(e) => setCountry(e.target.value)}
                    value={country}
                    required
                ></input>
            </div>
            <div>
                <label>Height</label>
                <input
                    type='text'
                    // onChange={}
                    // value={}
                ></input>
            </div>
            <div>
                <label>Weight</label>
                <input
                    type='text'
                    // onChange={}
                    // value={}
                ></input>
            </div>
            <div>
                <label>Bio</label>
                <input
                    type='textarea'
                    // onChange={}
                    // value={}
                ></input>
            </div>
            <button type="submit" onSubmit={handleUpdate}>Update</button>
        </form>
    )
}


export default EditProfileTab;

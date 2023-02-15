import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './EditProfileTab.css'

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
        <>
            <div className='edit-prof-container'>
                <div className='edit-prof-form-container'>

                    <h1 className="edit-prof-title"></h1>
                    <form className='edit-prof-form'>
                        <label className='edit-prof-label'>Username
                            <input
                                className='edit-prof-input'
                                type='text'
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            ></input>
                        </label>
                        <label className='edit-prof-label'>Email
                            <input
                                className='edit-prof-input'
                                type='text'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            ></input>
                        </label>
                        <label className='edit-prof-label'>Country/Location
                            <input
                                className='edit-prof-input'
                                type='text'
                                onChange={(e) => setCountry(e.target.value)}
                                value={country}
                                required
                            ></input>
                        </label>
                        <label className='edit-prof-label'>Height
                            <input
                                className='edit-prof-input'
                                type='text'
                            // onChange={}
                            // value={}
                            ></input>
                        </label>
                        <label className='edit-prof-label'>Weight
                            <input
                                className='edit-prof-input'
                                type='text'
                            // onChange={}
                            // value={}
                            ></input>
                        </label>
                        <label className='edit-prof-label'>Bio
                            <textarea
                                type='textarea'
                            // onChange={}
                            // value={}
                            ></textarea>
                        </label>
                        <button className='edit-prof-button' type="submit" onSubmit={handleUpdate}>Update</button>
                    </form>
                </div>
            <div className='edit-prof-img-container'>
                <img
                src='https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2022%2F10%2Fgoat-to-acquire-grailed-announcement-info-0.jpg?w=960&cbr=1&q=90&fit=max'
                    className='edit-prof-img'>
                </img>
            </div>
            </div>
        </>
    )
}


export default EditProfileTab;

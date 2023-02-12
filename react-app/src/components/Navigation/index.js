import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const [search, setSearch] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(`Searching for: ${search}`);
	};

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navbar'>
			<div className='home-link'>
				<NavLink exact to="/">Home</NavLink>
			</div>

			<div className="search-container">
				<div className="input-group">
					<input type="text" placeholder="Search" className="search-input" />
					<button className="search-button">Search</button>
				</div>
			</div>


			<div className='right-side-container'>

				<button className='sell-button'>SELL</button>
				<NavLink className="shop-link" exact to="/items">SHOP</NavLink>
				<button className='favorites-button'>♥</button>
				{isLoaded && (
					<div>
						<ProfileButton user={sessionUser}  className="profile-button"/>
					</div>
				)}
			</div>
		</div>
	);
}

export default Navigation;
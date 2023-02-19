import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';

import OpenModalButton from "../OpenModalButton";
import CreateModalButton from "../CreateModalButton"
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import SearchComingSoon from '../ComingSoonModals/SearhComingSoon'; 

import './Navigation.css';
import ItemCreateModal from '../Forms/ItemCreateForm';
import SearchFilter from './SearchFilter';

function Navigation({ isLoaded }) {
	const history = useHistory()
	const ulRef = useRef();

	const user = useSelector(state => state?.session?.user);

	const [search, setSearch] = useState("");
	const [showMenu, setShowMenu] = useState(false);

	const clickHandler = () => {
		<SearchComingSoon />
	}

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (!ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);

		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu]);

	const closeMenu = () => setShowMenu(false);

	const favoriteClick = (e) => {
		e.preventDefault();
		history.push(`/favorites/${user?.id}`);
	}

	const sellClick = (e) => {
		e.preventDefault()
		history.push('/items/create');
	}

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const handleChange = (e) => {
		setSearch(e.target.value);
	};

	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navbar'>
			<div className='home-link-container'>
				<NavLink className='home-link' exact to="/">HOLYGRAIL</NavLink>
			</div>

			{/* <div className="search-container">
				<div className="input-group">
					<input type="text" placeholder="Search" className="search-input" />
					<SearchComingSoon />
				</div>
			</div> */}
			<SearchFilter />


			<div className='right-side-container'>

				{sessionUser && (
					<>
						<CreateModalButton
							buttonText='SELL'
							modalComponent={
								<ItemCreateModal />
							}
						/>
					</>

				)}
				<NavLink className="shop-link" exact to="/items">SHOP</NavLink>

				{!sessionUser && (
					<>
						<OpenModalButton/>
					</>
				)}

				{sessionUser && (
					<button onClick={favoriteClick} className='favorites-button'><i class="fa-solid fa-heart"></i></button>
				)}
				{sessionUser && isLoaded && (
					<div>
						<ProfileButton user={sessionUser} className="profile-button" />
					</div>
				)}


			</div>
		</div>
	);
}

export default Navigation;

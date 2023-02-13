import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'
import { Link, NavLink } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const ulRef = useRef();

  const sessionUser = useSelector(state => state.session.user);

  const [showMenu, setShowMenu] = useState(false);

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

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <div className="profile-wrapper">
        <div className="profile-container">
          <button className="profile-button" onClick={openMenu}>
            <i className="fas fa-user-circle" />
          </button>
          <ul className={ulClassName} ref={ulRef}>
            {user ? (
              <>
                <div className="dropdown-menu-container">
                  <div>
                    {sessionUser ?
                      <NavLink className='dropdown-username' to={`users/profile/${sessionUser.id}`}>{user.username}</NavLink>
                      : null}
                  </div>
                  <div className="drop-down-border"></div>
                  <div>
                    {sessionUser ?
                      <NavLink className='dropdown-favorites' to='/favorites'>Favorites</NavLink>
                      : null}
                  </div>
                  <div className="drop-down-border"></div>

                  <div className="drop-down-border"></div>
                  <div>
                    <Link className='dropdown-logout' onClick={handleLogout}>Sign Out</Link>
                  </div>
                </div>

              </>
            ) : (
              <>

              </>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}

export default ProfileButton;

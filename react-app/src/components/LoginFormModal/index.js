import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import OpenModalButton from "../OpenModalButton";
import SignupFormModal from "../SignupFormModal";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
      closeModal()
    }
  };

  const demoUser = (e) => {
    e.preventDefault()
    const email = "user0@aa.io"
    const password = '123'
    dispatch(sessionActions.login({ email, password }))
    closeModal()
  }

  return (
    <>
      <div className="login-modal-container">
        <h1 className="modal-title">Log in</h1>
        <div className="login-desc">Log in to your HolyGrail account to buy, sell, and more.</div>
        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className="login-label-container">
              <label className="login-label">
                <span className="login-label-text">Email</span>
                <input
                  className="login-input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="login-label">
                <span className="login-label-text">Password</span>
                <input
                  className="login-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <button className="login-button" type="submit">LOG IN</button>
            <div className="alternate-logins">
              or
            </div>
            <button
              className="modal-demo-button"
              onClick={demoUser}
              type='submit'
            >Demo user
            </button>
            {/* <div className="signup-redirect"> */}
            {/* <OpenModalButton

              modalComponent={<SignupFormModal />}
            /> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;

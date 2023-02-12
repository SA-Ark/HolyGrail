import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
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
    const email = "user1@aa.io"
    const password = '123'
    dispatch(login({ email, password }))
    closeModal()
  }

  return (
    <>
      <div className="login-signup-modal-container">
        <h1 className="modal-title">Log in</h1>
        <div className="login-signup-desc">Log in to your HolyGrail account to buy, sell, and more.</div>
        <div className="login-signup-form-container">
          <form className="login-signup-form" onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div className="login-signup-label-container">
              <label className="login-signup-label">
                <span className="login-signup-label-text">Email</span>
                <input
                  className="login-signup-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="login-signup-label">
                <span className="login-signup-label-text">Password</span>
                <input
                  className="login-signup-input"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </label>
            </div>
            <button className="login-signup-button" type="submit">LOG IN</button>
            <div className="alternate-logins">
              or
            </div>
            <button
              className="modal-demo-button"
              onClick={demoUser}
              type='submit'
            >Demo user
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginFormModal;

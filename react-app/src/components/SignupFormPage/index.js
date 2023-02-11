import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignupForm.css';

const SignupFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [country, setCountry] = useState('')
  const [genderStyle, setGenderStyle] = useState('')
  const [shirtSize, setShirtSize] = useState('')
  const [pantSize, setPantSize] = useState('')
  const [shoeSize, setShoeSize] = useState('')

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const userArr = [
        username,
        email,
        password,
        firstName,
        lastName,
        streetAddress,
        city,
        state,
        postalCode,
        country,
        genderStyle,
        shirtSize,
        pantSize,
        shoeSize
      ]

      const data = await dispatch(signUp(userArr));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateStreetAddress = (e) => {
    setStreetAddress(e.target.value);
  };

  const updateCity = (e) => {
    setCity(e.target.value);
  };

  const updateState = (e) => {
    setState(e.target.value);
  };

  const updatePostalCode = (e) => {
    setPostalCode(e.target.value);
  };

  const updateCountry = (e) => {
    setCountry(e.target.value);
  };

  const updateGenderStyle = (e) => {
    setGenderStyle(e.target.value);
  };

  const updateShirtSize = (e) => {
    setShirtSize(e.target.value);
  };

  const updatePantSize = (e) => {
    setPantSize(e.target.value);
  };

  const updateShoeSize = (e) => {
    setShoeSize(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateconfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  if (sessionUser) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          {errors.map((error, idx) => <div key={idx}>{error}</div>)}
        </div>
        <div>
          <label>Email</label>
          <input
            type='text'
            onChange={updateEmail}
            value={email}
            required
          ></input>
        </div>
        <div>
          <label>User Name</label>
          <input
            type='text'
            onChange={updateUsername}
            value={username}
            required
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            onChange={updatePassword}
            value={password}
            required
          ></input>
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type='password'           
            onChange={updateconfirmPassword}
            value={confirmPassword}
            required
          ></input>
        </div>
        <div>
          <label>First Name</label>
          <input
            type='text'
            onChange={updateFirstName}
            value={firstName}
            required
          ></input>
        </div>
        <div>
          <label>Last Name</label>
          <input
            type='text'
            onChange={updateLastName}
            value={lastName}
            required
          ></input>
        </div>
        <div>
          <label>Street Address</label>
          <input
            type='text'
            onChange={updateStreetAddress}
            value={streetAddress}
            required
          ></input>
        </div>
        <div>
          <label>City</label>
          <input
            type='text'
            onChange={updateCity}
            value={city}
            required
          ></input>
        </div>
        <div>
          <label>State</label>
          <input
            type='text'
            onChange={updateState}
            value={state}
            required
          ></input>
        </div>
        <div>
          <label>Postal Code</label>
          <input
            type='text'
            onChange={updatePostalCode}
            value={postalCode}
            required
          ></input>
        </div>
        <div>
          <label>Country</label>
          <input
            type='text'
            onChange={updateCountry}
            value={country}
            required
          ></input>
        </div>
        <div>
          <label>Gender Style</label>
          <input
            type='text'
            onChange={updateGenderStyle}
            value={genderStyle}
            required
          ></input>
        </div>
        <div>
          <label>Shirt Size</label>
          <input
            type='text'
            onChange={updateShirtSize}
            value={shirtSize}
          ></input>
        </div>
        <div>
          <label>Pant Size</label>
          <input
            type='text'
            onChange={updatePantSize}
            value={pantSize}
          ></input>
        </div>
        <div>
          <label>Shoe Size</label>
          <input
            type='text'
            onChange={updateShoeSize}
            value={shoeSize}
          ></input>
        </div>
        <button type='submit'>Sign Up</button>
      </form>
    </>
  );
};

export default SignupFormPage;

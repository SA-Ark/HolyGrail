import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from "../../context/Modal";
import { Redirect } from 'react-router-dom';
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
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
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const sessionUser = useSelector((state) => state.session.user);
    const errorRef = useRef(null);

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
				setErrors(data);
				errorRef.current.scrollIntoView({ behavior: "smooth" });
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
			errorRef.current.scrollIntoView({ behavior: "smooth" });
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

	const categorySizes = {
        tops: ['XS', 'S', 'M', 'L', 'XL'],
        bottoms: ['XS', 'S', 'M', 'L', 'XL'],
        footwear: ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'],
        outerwear: ['XS', 'S', 'M', 'L', 'XL'],
        tailoring: ['XS', 'S', 'M', 'L', 'XL'],
        // accessories: ['Glasses', 'Gloves & Scarves', 'Hats', 'Jewelry & Watches', 'Wallets', 'Sunglasses', "Socks & Underwear"]
    }

	return (
		<>
			<div className="signup-modal-container">
				<h1 className="modal-title"> Sign Up</h1>
				<div className="signup-desc">Log in to your HolyGrail account to buy, sell, and more.</div>
				<div className="login-signup-form-container">
					<form className="login-signup-form" onSubmit={handleSubmit}>
                    <div ref={errorRef}>
                            {errors.length > 0 && (
                                <div className="error-messages">
                                    {errors.map((error, ind) => (
                                        <div key={ind}>
                                            {error}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
						<div className="login-signup-label-container">
							<label className="login-signup-label">
								<input
									className="signup-input"
									type='email'
									placeholder="Email"
									onChange={updateEmail}
									value={email}
									required
								></input>
							</label>

							<label className="login-signup-label">
								<input
									className="signup-input"
									type='text'
									placeholder="Username"
									onChange={updateUsername}
									value={username}
									required
								></input>
							</label>

							<label className="login-signup-label">
								<input
									className="signup-input"
									type='password'
									placeholder="Password"
									onChange={updatePassword}
									value={password}
									required
								/>
							</label>

							<label className="login-signup-label">
								<input
									className="signup-input"
									type='password'
									placeholder="Confirm Password"
									onChange={updateconfirmPassword}
									value={confirmPassword}
									required
								></input>
							</label>

							<label className="login-signup-label">
								<input
									className="signup-input"
									type='text'
									placeholder="First"
									onChange={updateFirstName}
									value={firstName}
									required
								></input>
							</label>

							<label className="login-signup-label">
								<input
									className="signup-input"
									type='text'
									placeholder="Last Name"
									onChange={updateLastName}
									value={lastName}
									required
								></input>
							</label>

							<label className="login-signup-label">
								<input
									className="signup-input"
									type='text'
									placeholder="Street Address"
									onChange={updateStreetAddress}
									value={streetAddress}
									required
								></input>
							</label>

							<label className="login-signup-label">
								<input
									className="signup-input"
									type='text'
									placeholder="City"
									onChange={updateCity}
									value={city}
									required
								></input>
							</label>

							<label className="login-signup-label">
								<input
									className="signup-input"
									type='text'
									placeholder="State"
									onChange={updateState}
									value={state}
									required
								></input>
							</label>

							<label className="login-signup-label">
								<input
									className="signup-input"
									type='text'
									placeholder="Postal Code"
									onChange={updatePostalCode}
									value={postalCode}
									required
								></input>
							</label>

							<label className="login-signup-label">
								<input
									className="signup-input"
									type='text'
									placeholder="Country"
									onChange={updateCountry}
									value={country}
									required
								></input>
							</label>

							<label className="login-signup-label">
								<input
									className="signup-input"
									type='text'
									placeholder="Gender Style"
									onChange={updateGenderStyle}
									value={genderStyle}
									required
								></input>
							</label>

							<label className="login-signup-label">
								<select
									className="signup-input"
									type='text'
									placeholder="Shirt Size"
									onChange={updateShirtSize}
									value={shirtSize}
									required
								>
									<option value=''>Shirt Size</option>
									<option>XS</option>
									<option>S</option>
									<option>M</option>
									<option>L</option>
									<option>XL</option>
								</select>

							</label>
							<label className="login-signup-label">
								<select
									className="signup-input"
									type='text'
									placeholder="Pant Size"
									onChange={updatePantSize}
									value={pantSize}
								>
									<option value=''>Pant Size</option>
									<option>XS</option>
									<option>S</option>
									<option>M</option>
									<option>L</option>
									<option>XL</option>
								</select>

							</label>
							<label className="login-signup-label">
								<select
									className="signup-input"
									type='text'
									placeholder="Shoe Size"
									onChange={updateShoeSize}
									value={shoeSize}
								>
									<option value=''>Shoe Size</option>
									<option>6</option>
									<option>7</option>
									<option>8</option>
									<option>9</option>
									<option>10</option>
									<option>11</option>
									<option>12</option>
									<option>13</option>
									<option>14</option>
									<option>15</option>
									<option>16</option>
								</select>
							</label>
						</div>
						<button className="login-signup-button" type='submit'>Sign Up</button>
					</form>
				</div>
			</div>
		</>
	);
}

export default SignupFormModal;
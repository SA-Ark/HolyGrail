import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { thunkCreateOrder } from '../../store/payments';
import { useModal } from '../../context/Modal';
import './PurchaseForm.css'

const PurchaseForm = ({ item }) => {
    const history = useHistory()
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const { closeModal } = useModal();

    const [errors, setErrors] = useState([])
    const [cardNumber, setCardNumber] = useState('');
    const [shippingAddress, setShippingAddress] = useState('')
    const [cardZip, setCardZip] = useState('')
    const [cardCountry, setCardCountry] = useState('')
    const [expiry, setExpiry] = useState("")
    const [cvc, setCvc] = useState("")
    const [hasSubmitted, setHasSubmitted] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()
        setErrors([])
        const orderAttributes = {
            order_total: item?.price,
            card_number: cardNumber,
            shipping_address: shippingAddress,
            card_zip: cardZip,
            card_country: cardCountry,
            expiry,
            cvc,
        }
        const data = await dispatch(thunkCreateOrder(orderAttributes, item?.id))
      
        if (data) {
            setErrors(data)
        } else {
            history.push(`/purchases/${sessionUser.id}`)
            closeModal()
        }
    };

    return (
        <div className='purchase-form-container'>
            <span className='purchase-title'>Payment</span>
            <form className='purchase-form' onSubmit={onSubmit}>
                {Object.values(errors).length > 0 && (
                    <div className="error-messages">
                        {Object.values(errors).map((error, ind) => (
                            <div key={ind}>
                                {error}
                            </div>
                        ))}
                    </div>
                )}


                <label className='purchase-label'>Card Number
                    <input
                        className='purchase-input'
                        type='text'
                        onChange={e => setCardNumber(e.target.value)}
                        value={cardNumber}
                        required
                    ></input>
                </label>
                <label className='purchase-label'>Shipping Address
                    <input
                        className='purchase-input'
                        type='text'
                        onChange={e => setShippingAddress(e.target.value)}
                        value={shippingAddress}
                        required
                    ></input>
                </label>
                <label className='purchase-label'>Billing Zip
                    <input
                        className='purchase-input'
                        type='text'
                        onChange={e => setCardZip(e.target.value)}
                        value={cardZip}
                        required
                    ></input>
                </label>
                <label className='purchase-label'>Country
                    <input
                        className='purchase-input'
                        type='text'
                        onChange={e => setCardCountry(e.target.value)}
                        value={cardCountry}
                        required
                    ></input>
                </label>
                <label className='purchase-label'>Expiration Date
                    <input
                        className='purchase-input'
                        required
                        type='date'
                        onChange={e => setExpiry(e.target.value)}
                        value={expiry}
                    ></input>
                </label>
                <label className='purchase-label'>CVC
                    <input
                        className='purchase-input'
                        required
                        type='text'
                        onChange={e => setCvc(e.target.value)}
                        value={cvc}
                    ></input>
                </label>
                <button className='purchase-form-button' type='submit'>Purchase: ${item?.price}</button>
            </form>
        </div>
    );
};

export default PurchaseForm;

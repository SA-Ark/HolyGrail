import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { thunkCreateOrder } from '../../store/payments';
import { useModal } from '../../context/Modal';

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
        console.log(data, '<----- data')
        if (data) {
            setErrors(data)
        } else {
            history.push(`/dashboard/${sessionUser.id}`)
            closeModal()
        }
    };

    return (
        <>
            <h1>Payment</h1>
            <form onSubmit={onSubmit}>
                <div>
                    {console.log('errors before mapping -->',errors)}
                    {Object.values(errors).map((error, idx) => <div key={idx}>{error}</div>)}
                </div>

                <div>
                    <label>Card Number</label>
                    <input
                        type='text'
                        onChange={e => setCardNumber(e.target.value)}
                        value={cardNumber}
                        required
                    ></input>
                </div>
                <div>
                    <label>Shipping Address</label>
                    <input
                        type='text'
                        onChange={e => setShippingAddress(e.target.value)}
                        value={shippingAddress}
                        required
                    ></input>
                </div>

                <div>
                    <label>Billing Zip</label>
                    <input
                        type='text'
                        onChange={e => setCardZip(e.target.value)}
                        value={cardZip}
                        required
                    ></input>
                </div>
                <div>
                    <label>Country</label>
                    <input
                        type='text'
                        onChange={e => setCardCountry(e.target.value)}
                        value={cardCountry}
                        required
                    ></input>
                </div>

                <div>
                    <label>Expiration Date</label>
                    <input
                        required
                        type='date'
                        onChange={e => setExpiry(e.target.value)}
                        value={expiry}
                    ></input>
                </div>
                <div>
                    <label>CVC</label>
                    <input
                        required
                        type='text'
                        onChange={e => setCvc(e.target.value)}
                        value={cvc}
                    ></input>
                </div>
                <button type='submit'>Purchase: ${item?.price}</button>
            </form>
        </>
    );
};

export default PurchaseForm;

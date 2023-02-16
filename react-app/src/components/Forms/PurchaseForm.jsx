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

    // if (sessionUser) return <Redirect to="/" />;

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const order = {
    //         order_total: item?.price,
    //         card_number: cardNumber,
    //         shipping_address: shippingAddress,
    //         card_zip: cardZip,
    //         card_country: cardCountry,
    //         expiry,
    //         cvc,
    //     }
    //     const res = await dispatch(thunkCreateOrder(order, item?.id))
    //     if (res?.ok) {
    //         const data = await res.json()
    //         if (data && data.errors) setErrors(data.errors)
    //         else history.push('/items')
    //     }
    // };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setValidationErrors([]);
    //     // const formErrors = []
    //     // if (cardNumber > 10) formErrors.push('ERORRRR')
    //     // setErrors([formErrors])
    //     const order = {
    //         order_total: item?.price,
    //         card_number: cardNumber,
    //         shipping_address: shippingAddress,
    //         card_zip: cardZip,
    //         card_country: cardCountry,
    //         expiry,
    //         cvc,
    //     };
    //     return dispatch(thunkCreateOrder(order, item?.id))
    //         // .then(() => {
    //         //     // setHasSubmitted(!hasSubmitted);
    //         //     // if (!formErrors.length) {
    //         //     // closeModal();
    //         //     // history.push(`/dashboard/${sessionUser.id}`);
    //         //     // }
    //         // })
    //         .catch(async (res) => {
    //             const data = await res.json();
    //             console.log('data --->', data, 'data')
    //             if (data && data.errors) setValidationErrors(data.errors);
    //         });
    // }



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
            closeModal()
        }
        // .then(() => {
        //     history.push(history.push(`/dashboard/${sessionUser.id}`));
        // })
        // .catch(async (res) => {
        //     console.log('res', res)
        //     const data = await res.json();
        //     console.log('data', data)
        //     if (data && data.errors) setValidationErrors(data.errors);
        // });
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

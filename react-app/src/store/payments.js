import { spreadPayments } from "./store-utils"

const CREATE_ORDER = 'CREATE_ORDER'
const LOAD_ORDERS = 'LOAD_ORDERS'

export const actionLoadOrders = (orders) => {
    return {
        type: LOAD_ORDERS,
        payload: orders
    }
}

export const actionCreateOrder = (order) => {
    return {
        type: CREATE_ORDER,
        payload: order
    }
}

export const thunkLoadOrders = (userId) => async (dispatch) => {
    const res = await fetch(`/api/payments/purchases`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {

        const data = await res.json();

        dispatch(actionLoadOrders(data))

    }
}


export const thunkCreateOrder = (orderAttributes, itemId) => async (dispatch) => {
    const { order_total, card_number, expiry, cvc,
        card_country, card_zip, shipping_address

    } = orderAttributes
    console.log('order attributes --->',
        order_total, card_number, expiry, cvc,
        card_country, card_zip, shipping_address
    )
    const res = await fetch(`/api/payments/${itemId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            order_total, card_number, expiry, cvc,
            card_country, card_zip, shipping_address
        })
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionCreateOrder(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    }
}

//! reducer
const initialState = { allOrders: {}, singleOrder: {} }

const paymentsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ORDERS: {

            const newState = { ...state }

            newState.allOrders = spreadPayments(action.payload)
            console.log(newState, "PAYMENT STATE")
            return newState
        }
        case CREATE_ORDER: {

            const newState = { ...state }
            newState.singleOrder = {...action.payload}

            return newState
        }
        default:
            return state;
    }
}

export default paymentsReducer;

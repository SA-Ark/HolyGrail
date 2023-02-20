import { spreadItems } from './store-utils';
import * as utils from './utils';

const LOAD_ITEMS = 'LOAD_ITEMS'
const LOAD_SINGLE_ITEM = 'LOAD_SINGLE_ITEM'
const CREATE_ITEM = 'CREATE_ITEM'
const EDIT_ITEM = 'EDIT_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

//! actions
export const actionLoadItems = (items) => {
    return {
        type: LOAD_ITEMS,
        payload: items
    }
}

export const actionLoadSingleItem = (item) => {
    return {
        type: LOAD_SINGLE_ITEM,
        payload: item
    }
}


export const actionCreateItem = (item) => {
    return {
        type: CREATE_ITEM,
        payload: item
    }
}

export const actionEditItem = (item) => {
    return {
        type: EDIT_ITEM,
        payload: item
    }
}

export const actionDeleteItem = (itemId) => {
    return {
        type: DELETE_ITEM,
        payload: itemId
    }
}

//! thunks
export const thunkLoadItems = (userId) => async (dispatch) => {
    let res;

    if (userId) {
        res = await fetch(`/api/items/current`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } else {
        res = await fetch(`/api/items`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    if (res.ok) {
        const items = await res.json()
        console.log(items, "ITEMS IN THUNK")
        dispatch(actionLoadItems(items))
    }
}

export const thunkLoadSingleItem = (itemId, userId) => async (dispatch) => {
    console.log(itemId, userId, " <------ITEMID")
    let res = null
    if (userId) {
        res = await fetch(`/api/items/current/${itemId}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } else {

        res = await fetch(`/api/items/${itemId}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    if (res.ok) {
        const item = await res.json()
        dispatch(actionLoadSingleItem(item))
        console.log(item, "ITEM in thunk")
        return item
    }
}

export const thunkCreateItem = (itemsAttributes) => async (dispatch) => {
    const [
        genderStyle, size, color, condition, categoryTags,
        price, shippingCost, description, name, previewUrl,
        imageUrl1, imageUrl2, imageUrl3, imageUrl4, user_id
    ] = itemsAttributes

    const res = await fetch(`/api/items/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            gender_style: genderStyle,
            size,
            color,
            condition,
            category_tags: categoryTags,
            price,
            shipping_cost: shippingCost,
            description,
            name,
            preview_url: previewUrl,
            image_url_1: imageUrl1,
            image_url_2: imageUrl2,
            image_url_3: imageUrl3,
            image_url_4: imageUrl4,
            user_id
            })
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionCreateItem(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    }
}

export const thunkEditItem = (itemsAttributes) => async (dispatch) => {
    const {
        genderStyle, size, color, condition, categoryTags,
        price, shippingCost, description, name, previewUrl,
        imageUrl1, imageUrl2, imageUrl3, imageUrl4, itemId, userId
     } = itemsAttributes
    console.log('THUNK NAME -->', name)
    const res = await fetch(`/api/items/edit/${itemId}`, {

        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            gender_style: genderStyle,
            size,
            color,
            condition,
            category_tags: categoryTags,
            price,
            shipping_cost: shippingCost,
            description,
            name,
            preview_url: previewUrl,
            image_url_1: imageUrl1,
            image_url_2: imageUrl2,
            image_url_3: imageUrl3,
            image_url_4: imageUrl4
        })
    })
    console.log('RES', res)
    if (res.ok) {
        const data = await res.json();
        console.log('data in thunk', data)
        dispatch(actionEditItem(data))
        return data;
    } else if (res.status < 500) {
        console.log('hi from below')
        const data = await res.json();
        console.log('data in thunk', data)
        // if (data.errors) {
        return data;
        // }
      }
}

export const thunkDeleteItem = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/items/delete/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionDeleteItem(itemId))
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
      }
}

//! reducer
const initialState = { allItems: {}, singleItem: {} }

const itemsReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD_ITEMS: {


            const newState = { allItems: {...state.allItems}, singleItem: {...state.singleItem} }
            newState.allItems = {...spreadItems(action.payload.items)}
            return newState
        }

        case LOAD_SINGLE_ITEM: {

            const newState = { ...state }
            newState.singleItem = action.payload
            return newState
        }

        case CREATE_ITEM: {

            const newState = { ...state }
            newState.singleItem = action.payload
            return newState
        }

        case EDIT_ITEM: {

            const newState = { ...state }
            newState.singleItem = action.payload
            return newState
        }

        case DELETE_ITEM: {

            const newState = { ...state }
            delete newState.singleItem
            return newState
        }

        default:
            return state;
    }
}

export default itemsReducer;

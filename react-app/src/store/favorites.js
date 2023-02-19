import * as utils from './utils';
import { spreadFavorites } from './store-utils';
const LOAD_FAVORITES = 'LOAD_FAVORITES'
const CREATE_FAVORITE = "CREATE_FAVORITE"
const DELETE_FAVORITE = "DELETE_FAVORITE"

export const actionLoadFavorites = (favorites) => {
    return {
        type: LOAD_FAVORITES,
        payload: favorites
    }
}


export const actionCreateFavorite = (favorite) => {
    return {
        type: CREATE_FAVORITE,
        payload: favorite
    }
}


export const actionDeleteFavorite = (favorite) => {
    return {
        type: DELETE_FAVORITE,
        payload: favorite
    }
}


export const thunkLoadFavorites = () => async (dispatch) => {

    const res = await fetch(`/api/favorites/current`, {
        headers: {
            'Content-Type': 'application/json',
        }
    })


    if (res.ok) {
        const favorites = await res.json()
        dispatch(actionLoadFavorites(favorites))
    }
}

export const thunkCreateFavorite = (itemId) => async (dispatch) => {

    const res = await fetch(`/api/favorites/${itemId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: null
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionCreateFavorite(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    }
}

export const thunkDeleteFavorite = (itemId) => async (dispatch) => {

    const res = await fetch(`/api/favorites/${itemId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(actionDeleteFavorite(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    }
}


//! reducer
const initialState = {
    allFavorites: {},
    singleFavorite: null
};

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_FAVORITES: {
            return {
                ...state,
                allFavorites: spreadFavorites(action.payload),
            };
        }
        case CREATE_FAVORITE: {
            return {
                ...state,
                singleFavorite: action.payload,
            };
        }
        case DELETE_FAVORITE: {
            return {
                ...state,
                singleFavorite: null,
                allFavorites: {
                    ...state.allFavorites,
                    [action.payload.id]: undefined
                }
            };
        }
        default:
            return state;
    }
};

export default favoritesReducer;

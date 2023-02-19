const LOAD_SEARCH = 'load_search';
const DELETE_SEARCH = 'delete_search';

export const actionLoadSearch = (filteredItems) => {
    return {
        type: LOAD_SEARCH,
        payload: filteredItems
    }
}

export const actionDeleteSearch = () => {
    return {
        type: DELETE_SEARCH,
    }
}

const initialState = { filtered: {} };
const filterReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SEARCH: {
            const newState = { filtered: { ...action.payload }}
            return newState;
        }
        case DELETE_SEARCH: {
            const newState = { filtered: {} }
            return newState;
        }
        default:
            return state;
    }
}

export default filterReducer;
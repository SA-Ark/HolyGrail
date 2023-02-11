const LOAD_REVIEWS = 'LOAD_REVIEWS'
const LOAD_SINGLE_REVIEW = 'LOAD_SINGLE_REVIEW'
const CREATE_REVIEW = 'CREATE_REVIEW'
const EDIT_REVIEW = 'EDIT_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW'

//! actions
export const actionLoadReviews = (reviews) => {
    return {
        type: LOAD_REVIEWS,
        payload: reviews
    }
}


// THUNKS
export const thunkLoadReviews = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        dispatch(actionLoadReviews(reviewId))
    }
}


//! reducer
const initialState = { allReviews: {}, singleReview: {} }

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {

            const newState = { ...initialState }
            newState.allReviews = action.payload.reviews
            return newState
        }

        case LOAD_SINGLE_REVIEW: {

            const newState = { ...initialState }
            newState.singleReview = action.payload
            return newState
        }

        case CREATE_REVIEW: {

            const newState = { ...initialState }
            newState.singleReview = action.payload
            return newState
        }

        case EDIT_REVIEW: {

            const newState = { ...initialState }
            newState.singleReview = action.payload
            return newState
        }

        case DELETE_REVIEW: {

            const newState = { ...initialState }
            newState.singleReview = {}
            return newState
        }

        default:
            return state;
    }
}

export default reviewsReducer;
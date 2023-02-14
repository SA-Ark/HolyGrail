const LOAD_REVIEWS = 'LOAD_REVIEWS'
const LOAD_CURR_REVIEWS = "LOAD_CURR_REVIEWS"
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

export const actionLoadCurrReviews = (reviews) => {
    return {
        type: LOAD_CURR_REVIEWS,
        payload: reviews
    }
}

export const actionLoadSingleReview = (review) => {
    return {
        type: LOAD_SINGLE_REVIEW,
        payload: review
    }
}

export const actionCreateReview = (review) => {
    return {
        type: CREATE_REVIEW,
        payload: review
    }
}

export const actionEditReview = (review) => {
    return {
        type: EDIT_REVIEW,
        payload: review
    }
}

export const actionDeleteReview = (review) => {
    return {
        type: DELETE_REVIEW,
        payload: review
    }
}


// THUNKS
export const thunkLoadReviews = (userId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/current/${userId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        console.log("RES IS OK")
        const data = await res.json();
        console.log(data, '<----review data')
        dispatch(actionLoadReviews(data))
        console.log(data, "thunk review data")
    }
}

export const thunkLoadCurrReviews = (userId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/current/${userId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionLoadCurrReviews(data))
    }
}

export const thunkLoadSingleReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionLoadSingleReview(data))
    }
}


export const thunkCreateReview = (reviewAttributes, itemId) => async (dispatch) => {
    const {reviewBody, stars} = reviewAttributes

    console.log(reviewBody, stars, "THUNK LOG")
    const res = await fetch(`/api/reviews/create/${itemId}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            review_body: reviewBody,
            stars
        })
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionCreateReview(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    }
}


export const thunkEditReview = (reviewAttributes, reviewId) => async (dispatch) => {
    const {reviewBody, stars} = reviewAttributes

    const res = await fetch(`/api/reviews/edit/${reviewId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            review_body: reviewBody,
            stars
        })
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionEditReview(data))
        return data
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    }
}

// export const thunkCreateReview = (reviewAttributes) => async (dispatch) => {
//     cost [reviewBody, stars] = reviewAttributes

//     const res = await fetch('', {
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             review_body: reviewBody,
//             stars
//         })
//     })
//     if (res.ok) {
//         const data = await res.json();
//         dispatch(actionCreateReview(data))
//         return data
//     } else if (res.status < 500) {
//         const data = await res.json();
//         if (data.errors) {
//             return data;
//         }
//     }
// }


export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const res = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    if (res.ok) {
        const data = await res.json();
        dispatch(actionDeleteReview(data))
    }
}

//! reducer
const initialState = { allReviews: {}, singleReview: {} }

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS: {

            const newState = { ...initialState }
            newState.allReviews = action.payload
            return newState
        }

        case LOAD_CURR_REVIEWS: {

            const newState = { ...initialState }
            newState.allReviews = action.payload
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
            delete newState.singleReview
            return newState
        }

        default:
            return state;
    }
}

export default reviewsReducer;

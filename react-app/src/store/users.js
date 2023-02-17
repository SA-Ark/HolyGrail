// constants
const GET_USER = 'GET_USER';

const getUser = (user) => ({
  type: GET_USER,
  payload: user
});

export const thunkGetUser = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(getUser(data));
}
    // console.log("DATA --->", response.json());
};

const initialState = { singleUser: null };

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return { singleUser: action.payload }
    default:
      return state;
  }
}
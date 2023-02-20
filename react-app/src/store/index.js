import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import session from './session'
import itemsReducer from './items';
import reviewsReducer from './reviews';
import favoritesReducer from './favorites';
import paymentsReducer from './payments';
import usersReducer from './users';
import filterReducer from './search';

const rootReducer = combineReducers({
  session,
  items: itemsReducer,
  reviews: reviewsReducer,
  favorites: favoritesReducer,
  payments: paymentsReducer,
  users: usersReducer,
  filtered: filterReducer
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;

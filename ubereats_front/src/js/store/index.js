import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { customerSigninReducer } from '../reducers/customerReducer';

const reducers = combineReducers({
  customer: customerSigninReducer,
});
const middleware = [thunk];

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  {},
  storeEnhancers(applyMiddleware(...middleware)),
);
export default store;

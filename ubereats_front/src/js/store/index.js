import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import { customerSigninReducer, customerSignupReducer } from '../reducers/customerReducer';
import { DishListReducer, DishDetailsReducer } from '../reducers/DishReducer';
import { cartReducer } from '../reducers/cartReducers';

const reducers = combineReducers({
  customerSignin: customerSigninReducer,
  cutomerSignup: customerSignupReducer,
  dishList: DishListReducer,
  dishDetails: DishDetailsReducer,
  cart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const customerSignInfoFromStorage = localStorage.getItem('jwt')
  ? JSON.parse(localStorage.getItem('jwt'))
  : null;

const initialState = {
  customerSignin: { customerSigninInfo: customerSignInfoFromStorage },
  cart: { cartItems: cartItemsFromStorage },
};
const middleware = [thunk];

const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  initialState,
  storeEnhancers(applyMiddleware(...middleware)),
);
export default store;

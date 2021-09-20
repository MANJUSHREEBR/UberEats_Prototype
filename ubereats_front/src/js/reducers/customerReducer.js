/* eslint-disable import/prefer-default-export */
import {
  CUSTOMER_SIGNIN_REQUEST,
  CUSTOMER_SIGNIN_SUCCESS,
  CUSTOMER_SIGNIN_FAIL,
  CUSTOMER_SIGNUP_REQUEST,
  CUSTOMER_SIGNUP_FAIL,
  CUSTOMER_SIGNUP_SUCCESS,
} from '../constants/customerConstants';

const initialState = {
  loadingFromState: false,
  customerSigninInfo: {},
  errorFromState: false,
  successFromState: false,
};

export const customerSigninReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_SIGNIN_REQUEST:
      return { loadingFromState: true, customerSigninInfo: {}, successFromState: false };
    case CUSTOMER_SIGNIN_SUCCESS:
      return {
        loadingFromState: false,
        customerSigninInfo: action.payload,
        successFromState: true,
      };
    case CUSTOMER_SIGNIN_FAIL:
      return { loadingFromState: false, errorFromState: action.payload, successFromState: false };

    case CUSTOMER_SIGNUP_REQUEST:
      return { loadingFromState: true, successFromState: false };
    case CUSTOMER_SIGNUP_SUCCESS:
      return {
        loadingFromState: false,
        successFromState: true,
      };
    case CUSTOMER_SIGNUP_FAIL:
      return { loadingFromState: false, errorFromState: action.payload, successFromState: false };
    default:
      return state;
  }
};

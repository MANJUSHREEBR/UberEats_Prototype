/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
// import axios from 'axios';

import {
  CUSTOMER_SIGNIN_REQUEST,
  CUSTOMER_SIGNIN_SUCCESS,
  CUSTOMER_SIGNIN_FAIL,
  CUSTOMER_SIGNOUT,
  CUSTOMER_SIGNUP_REQUEST,
  CUSTOMER_SIGNUP_SUCCESS,
  CUSTOMER_SIGNUP_FAIL,
  CUSTOMER_UPDATE_PROFILE_REQUEST,
  CUSTOMER_UPDATE_PROFILE_SUCCESS,
  CUSTOMER_UPDATE_PROFILE_FAIL,
} from '../constants/customerConstants';

import { API } from '../../config';

export const customerSignin = (user, isCustomer) => (dispatch) => {
  dispatch({ type: CUSTOMER_SIGNIN_REQUEST });
  fetch(`${API}/${isCustomer}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: CUSTOMER_SIGNIN_SUCCESS,
          payload: response,
        });
        localStorage.setItem('customerInfo', JSON.stringify(response));
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_SIGNIN_FAIL,
        payload: error,
      });
    });
};

export const customersignup = (user, isCustomer) => (dispatch) => {
  dispatch({ type: CUSTOMER_SIGNUP_REQUEST });
  fetch(`${API}/${isCustomer}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: CUSTOMER_SIGNUP_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_SIGNUP_FAIL,
        payload: error,
      });
    });
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('customerInfo');
  dispatch({
    type: CUSTOMER_SIGNOUT,
  });
};

export const customerUpdateProfile = (user, token, id) => (dispatch, getState) => {
  dispatch({ type: CUSTOMER_UPDATE_PROFILE_REQUEST });

  fetch(`${API}/customer/${id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: user,

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: CUSTOMER_UPDATE_PROFILE_SUCCESS,
          payload: response,
        });
        console.log(response);
        const customerInfo = { token, customer: response.customer };
        dispatch({
          type: CUSTOMER_SIGNIN_SUCCESS,
          payload: customerInfo,
        });
        localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: CUSTOMER_UPDATE_PROFILE_FAIL,
        payload: error,
      });
    });
};

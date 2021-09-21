/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

import {
  CUSTOMER_SIGNIN_REQUEST,
  CUSTOMER_SIGNIN_SUCCESS,
  CUSTOMER_SIGNIN_FAIL,
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
        localStorage.setItem('jwt', JSON.stringify(response));
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
  dispatch({ type: CUSTOMER_SIGNIN_REQUEST });
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
          type: CUSTOMER_SIGNIN_SUCCESS,
          payload: response,
        });
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

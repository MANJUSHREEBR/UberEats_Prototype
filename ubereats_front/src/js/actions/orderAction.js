/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
}
  from '../constants/orderConstants';
import { CART_REMOVE_ITEMS } from '../constants/cartConstants';
import { API } from '../../config';

export const createOrder = (order) => (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  const { customerSignin: { customerSigninInfo } } = getState();
  order.customer_id = customerSigninInfo.customer[0].id;
  fetch(`${API}/order/create/${customerSigninInfo.customer[0].id}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${customerSigninInfo.token}`,
    },
    body: JSON.stringify(order),

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: ORDER_CREATE_SUCCESS,
          payload: response,
        });
        dispatch({
          type: CART_REMOVE_ITEMS,
          payload: {},
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload: error,
      });
    });
};
export const getOrderDetails = (id) => (dispatch, getState) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  const { customerSignin: { customerSigninInfo } } = getState();
  fetch(`${API}/order/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${customerSigninInfo.token}`,
    },

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: ORDER_DETAILS_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: ORDER_DETAILS_FAIL,
        payload: error,
      });
    });
};

export const getMyOrderList = () => (dispatch, getState) => {
  dispatch({ type: MY_ORDER_LIST_REQUEST });
  const { customerSignin: { customerSigninInfo } } = getState();
  fetch(`${API}/orders/${customerSigninInfo.customer[0].id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${customerSigninInfo.token}`,
    },

  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: MY_ORDER_LIST_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: MY_ORDER_LIST_FAIL,
        payload: error,
      });
    });
};

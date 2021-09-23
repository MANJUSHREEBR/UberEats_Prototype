/* eslint-disable import/named */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/prefer-default-export */
import { CART_ADD_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants';
import { API } from '../../config';

export const addToCart = (id, qty) => (dispatch, getState) => {
  fetch(`${API}/dishes/${id}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: CART_ADD_ITEM,
          payload: {
            dish: response[0].id,
            name: response[0].name,
            photo: response[0].photo,
            price: response[0].price,
            description: response[0].description,
            qty,
          },
        });
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
      }
    });
};

export const saveShippindAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

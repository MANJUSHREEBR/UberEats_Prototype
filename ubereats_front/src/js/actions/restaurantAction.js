/* eslint-disable import/prefer-default-export */
import {
  RESTAURANT_LIST_REQUEST,
  RESTAURANT_LIST_SUCCESS,
  RESTAURANT_LIST_FAIL,
} from '../constants/restaurantConstants';
import { API } from '../../config';

export const listRestaurants = (sortBy) => (dispatch) => {
  dispatch({ type: RESTAURANT_LIST_REQUEST });
  fetch(`${API}/restaurant?sortBy=${sortBy}&order=DESC&limit=100`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      if (!response.error) {
        dispatch({
          type: RESTAURANT_LIST_SUCCESS,
          payload: response,
        });
      } else {
        throw (response.error);
      }
    })
    .catch((error) => {
      dispatch({
        type: RESTAURANT_LIST_FAIL,
        payload: error,
      });
    });
};

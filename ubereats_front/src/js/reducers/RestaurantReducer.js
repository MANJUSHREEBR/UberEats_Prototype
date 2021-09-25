/* eslint-disable import/prefer-default-export */
import {
  RESTAURANT_LIST_REQUEST,
  RESTAURANT_LIST_SUCCESS,
  RESTAURANT_LIST_FAIL,
} from '../constants/restaurantConstants';

export const RestaurantListReducer = (state = { restaurants: [] }, action) => {
  switch (action.type) {
    case RESTAURANT_LIST_REQUEST:
      return { loadingFromState: true, restaurants: [] };
    case RESTAURANT_LIST_SUCCESS:
      return {
        loadingFromState: false,
        restaurants: action.payload.restaurant,
      };
    case RESTAURANT_LIST_FAIL:
      return { loadingFromState: false, errorFromState: action.payload };
    default:
      return { ...state };
  }
};

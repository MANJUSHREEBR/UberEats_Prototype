/* eslint-disable import/prefer-default-export */
import {
  DISH_LIST_REQUEST,
  DISH_LIST_SUCCESS,
  DISH_LIST_FAIL,
  DISH_DETAILS_REQUEST,
  DISH_DETAILS_SUCCESS,
  DISH_DETAILS_FAIL,
} from '../constants/dishConstants';

export const DishListReducer = (state = { dishes: [] }, action) => {
  switch (action.type) {
    case DISH_LIST_REQUEST:
      return { loadingFromState: true, dishes: [] };
    case DISH_LIST_SUCCESS:
      return {
        loadingFromState: false,
        dishes: action.payload.dishes,
      };
    case DISH_LIST_FAIL:
      return { loadingFromState: false, errorFromState: action.payload };
    default:
      return { ...state };
  }
};
export const DishDetailsReducer = (state = { dish: [{}] }, action) => {
  switch (action.type) {
    case DISH_DETAILS_REQUEST:
      return { loadingFromState: true, dish: { } };
    case DISH_DETAILS_SUCCESS:
      return {
        loadingFromState: false,
        dish: action.payload[0],
      };
    case DISH_DETAILS_FAIL:
      return { loadingFromState: false, errorFromState: action.payload };
    default:
      return { ...state };
  }
};

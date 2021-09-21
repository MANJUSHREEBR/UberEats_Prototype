/* eslint-disable no-case-declarations */
/* eslint-disable import/prefer-default-export */
import { CART_ADD_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.dish === item.dish);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.dish === existItem.dish ? item : x)),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };

    default:
      return { ...state };
  }
};

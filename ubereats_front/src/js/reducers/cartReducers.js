/* eslint-disable no-case-declarations */
/* eslint-disable import/prefer-default-export */
import { CART_ADD_ITEM, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
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
    case CART_SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    default:
      return { ...state };
  }
};

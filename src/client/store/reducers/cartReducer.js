import {
  ADD_ITEM_TO_CART,
  PAGES,
  REMOVE_CART_ITEM
} from '../actions/actionTypes';

let initialState = {};

if (window != null) {
  initialState = {
    shoppingItemOverviewItem: null,
    cartItems: [],
  };
}

const reducer = (state = initialState, action) => {
  const {
    itemID, cartItems, updatedCartItem, type
  } = action;
  const { cartItems: oldCartItems } = state;
  switch (type) {
    case ADD_ITEM_TO_CART:
    case PAGES.CART:
      if (updatedCartItem != null) {
        oldCartItems[updatedCartItem.id] = updatedCartItem;
      }
      return {
        ...state,
        cartItems: cartItems == null ? oldCartItems : cartItems
      };
    case REMOVE_CART_ITEM:
      return cartItems != null && itemID != null ? {
        ...state,
        cartItems,
        shoppingItemOverviewItem: cartItems[itemID]
      } : {
        ...state,
        cartItems,
      };
    default:
      return state;
  }
};

export default reducer;

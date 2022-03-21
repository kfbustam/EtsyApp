import {
  ADD_ITEM_TO_CART,
  GET_SHOPPING_ITEMS_IN_CART,
  REMOVE_CART_ITEM,
} from '../actions/actionTypes';

let initialState = {};

if (window != null) {
  initialState = {
    shoppingItemOverviewItem: null,
    cartItems: [],
  };
}

const reducer = (state = initialState, action) => {
  const { itemID, cartItems, type } = action;
  const { cartItems: oldCartItems } = state;
  switch (type) {
    case ADD_ITEM_TO_CART:
    case GET_SHOPPING_ITEMS_IN_CART:
      return {
        ...state,
        cartItems
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

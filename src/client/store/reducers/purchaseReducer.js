import {
  ADD_ITEM_TO_PURCHASE_HISTORY,
  GET_PURCHASES
} from '../actions/actionTypes';

let initialState = {};

if (window != null) {
  initialState = {
    shoppingItemOverviewItem: null,
    purchaseHistory: [],
  };
}

const reducer = (state = initialState, action) => {
  const { itemID, purchaseHistory, type } = action;
  const { purchaseHistory: oldPurchaseHistory } = state;
  switch (type) {
    case ADD_ITEM_TO_PURCHASE_HISTORY:
    case GET_PURCHASES:
      return {
        ...state,
        purchaseHistory
      };
    default:
      return state;
  }
};

export default reducer;

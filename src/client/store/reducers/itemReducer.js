import { ADD_ITEM_TO_FAVORITES, GET_SHOPPING_ITEMS_POSTED_BY_USERS, REMOVE_ITEM_FROM_FAVORITES } from '../actions/actionTypes';

let initialState = {};

if (window != null) {
  initialState = {
    items: [],
  };
}

const reducer = (state = initialState, action) => {
  const { items } = action;
  switch (action.type) {
    case ADD_ITEM_TO_FAVORITES:
    case GET_SHOPPING_ITEMS_POSTED_BY_USERS:
    case REMOVE_ITEM_FROM_FAVORITES:
      return {
        items
      };
    default:
      return state;
  }
};

export default reducer;

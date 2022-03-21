import {
  ADD_ITEM_TO_FAVORITES,
  GET_SHOPPING_ITEMS_POSTED_BY_USERS,
  REMOVE_ITEM_FROM_FAVORITES,
  SET_SHOPPING_ITEM_OVERVIEW,
  SEARCH_ITEMS,
  UPDATE_SEARCH_INPUT
} from '../actions/actionTypes';

let initialState = {};

if (window != null) {
  initialState = {
    fuse: null,
    shoppingItemOverviewItem: null,
    searchResult: [],
    searchInputText: '',
    items: [],
  };
}

const reducer = (state = initialState, action) => {
  const {
    itemID, items, searchResult, searchInputText, type
  } = action;
  const { items: currentItems } = state;
  switch (type) {
    case UPDATE_SEARCH_INPUT:
      return {
        ...state,
        searchInputText
      };
    case SEARCH_ITEMS:
      return {
        ...state,
        searchResult
      };
    case SET_SHOPPING_ITEM_OVERVIEW:
      return {
        ...state,
        shoppingItemOverviewItem: items != null && itemID != null
          ? items[itemID] : currentItems[itemID]
      };
    case ADD_ITEM_TO_FAVORITES:
    case GET_SHOPPING_ITEMS_POSTED_BY_USERS:
    case REMOVE_ITEM_FROM_FAVORITES:
      return items != null && itemID != null ? {
        ...state,
        items,
        shoppingItemOverviewItem: items[itemID]
      } : {
        ...state,
        items,
      };
    default:
      return state;
  }
};

export default reducer;

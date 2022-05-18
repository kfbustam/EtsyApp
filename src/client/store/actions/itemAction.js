import {
  ADD_ITEM_TO_FAVORITES,
  REMOVE_ITEM_FROM_FAVORITES,
  GET_SHOPPING_ITEMS_POSTED_BY_USERS,
  PAGES,
  SET_SHOPPING_ITEM_OVERVIEW,
  SEARCH_ITEMS,
  UPDATE_SEARCH_INPUT
} from './actionTypes';

const URL = 'http://localhost:8080';

const getOptions = data => ({
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'GET',
  body: JSON.stringify(data)
});

const postOptions = data => ({
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(data)
});


export const viewShoppingItemOverview = itemID => (dispatch) => {
  dispatch({
    type: SET_SHOPPING_ITEM_OVERVIEW,
    itemID
  });
};

export const updateSearchInputText = searchInputText => (dispatch) => {
  dispatch({
    type: UPDATE_SEARCH_INPUT,
    searchInputText
  });
};

export const runFuzzySearch = searchText => (dispatch) => {
  fetch(`${URL}/search`, postOptions({ searchText }))
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { searchResult } = responseData;
          dispatch({
            searchResult,
            type: SEARCH_ITEMS,
          });
          dispatch({ type: PAGES.SEARCH_LANDING });
          return responseData;
        });
      }
      console.log('Error occurred:');
      console.log(res);
      return { errorMessages: { REQUEST_ERROR: res.statusText } };
    });
};

export const addItemToFavorites = itemID => (dispatch) => {
  fetch(`${URL}/favoriteItem`, postOptions({ itemID }))
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { items } = responseData;
          dispatch({
            type: ADD_ITEM_TO_FAVORITES,
            itemID,
            items
          });
          return responseData;
        });
      }
      console.log('Error occurred:');
      console.log(res);
      return { errorMessages: { REQUEST_ERROR: res.statusText } };
    });
};

export const hydrateShoppingItems = () => (dispatch) => {
  fetch(`${URL}/items`, getOptions())
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { items } = responseData;
          dispatch({
            type: GET_SHOPPING_ITEMS_POSTED_BY_USERS,
            items
          });
          return responseData;
        });
      }
      console.log('Error occurred:');
      console.log(res);
      return { errorMessages: { REQUEST_ERROR: res.statusText } };
    });
};

export const removeItemFromFavorites = itemID => (dispatch) => {
  fetch(`${URL}/unFavoriteItem`, postOptions({ itemID }))
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { item, items } = responseData;
          dispatch({
            type: REMOVE_ITEM_FROM_FAVORITES,
            itemID: item.id,
            items
          });
          return responseData;
        });
      }
      console.log('Error occurred:');
      console.log(res);
      return { errorMessages: { REQUEST_ERROR: res.statusText } };
    });
};

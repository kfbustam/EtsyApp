import { ADD_ITEM_TO_FAVORITES, REMOVE_ITEM_FROM_FAVORITES, GET_SHOPPING_ITEMS_POSTED_BY_USERS } from './actionTypes';

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

export const addItemToFavorites = itemID => (dispatch) => {
  fetch(`${URL}/favoriteItem`, postOptions({ itemID }))
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { items } = responseData;
          dispatch({
            type: ADD_ITEM_TO_FAVORITES,
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
          const { items } = responseData;
          dispatch({
            type: REMOVE_ITEM_FROM_FAVORITES,
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

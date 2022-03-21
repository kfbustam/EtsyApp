import {
  ADD_ITEM_TO_FAVORITES, REMOVE_CART_ITEM, GET_SHOPPING_ITEMS_IN_CART, SET_SHOPPING_ITEM_OVERVIEW
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

export const addItemToCart = itemID => (dispatch) => {
  fetch(`${URL}/addCartItem`, postOptions({ itemID }))
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { item, items } = responseData;
          dispatch({
            type: ADD_ITEM_TO_FAVORITES,
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

export const hydrateCartItems = () => (dispatch) => {
  fetch(`${URL}/cartItems`, getOptions())
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { cartItems } = responseData;
          dispatch({
            type: GET_SHOPPING_ITEMS_IN_CART,
            cartItems: Object.values(cartItems)
          });
          return responseData;
        });
      }
      console.log('Error occurred:');
      console.log(res);
      return { errorMessages: { REQUEST_ERROR: res.statusText } };
    });
};

export const removeItemFromCart = itemID => (dispatch) => {
  fetch(`${URL}/removeCartItem`, postOptions({ itemID }))
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { cartItems } = responseData;
          dispatch({
            type: REMOVE_CART_ITEM,
            cartItems
          });
          return responseData;
        });
      }
      console.log('Error occurred:');
      console.log(res);
      return { errorMessages: { REQUEST_ERROR: res.statusText } };
    });
};

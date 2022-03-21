import {
  ADD_ITEM_TO_PURCHASE_HISTORY, GET_PURCHASES
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

export const addItemToPurchaseHistory = itemID => (dispatch) => {
  fetch(`${URL}/addItemToPuchaseHistory`, postOptions({ itemID }))
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { item, items } = responseData;
          dispatch({
            type: ADD_ITEM_TO_PURCHASE_HISTORY,
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

export const hydratePurchaseHistoryItems = () => (dispatch) => {
  fetch(`${URL}/purchaseHistory`, getOptions())
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { purchaseHistory } = responseData;
          dispatch({
            type: GET_PURCHASES,
            purchaseHistory: Object.values(purchaseHistory)
          });
          return responseData;
        });
      }
      console.log('Error occurred:');
      console.log(res);
      return { errorMessages: { REQUEST_ERROR: res.statusText } };
    });
};

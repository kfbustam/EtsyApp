import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import {
  SET_SHOPPING_ITEM_OVERVIEW,
  PAGES,
} from './actionTypes';

const URL = 'http://localhost:8080';

const postOptions = data => ({
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(data)
});


export const updateShopInfo = itemID => (dispatch) => {
  dispatch({
    type: SET_SHOPPING_ITEM_OVERVIEW,
    itemID
  });
};

export const hydrateShopInfo = () => (dispatch) => {
  const client = new ApolloClient({
    uri: `${URL}/graphql`,
  });
  client.query({
    query: gql`
      query Query {
        shops {
          admirerCount,
          dateJoined,
          name,
          saleCount,
          shopInfoSrc: src,
          shopItems: items {
            cost: price,
            itemName: name,
          },
          ownerInfo {
            username,
            region,
            currency,
            language
          }
        }
      }
    `,
  })
    .then((response) => {
      dispatch({
        myShopInfo: response.data.shops,
        type: PAGES.SHOP_HOME
      });
    })
    .catch(error => console.log(error));
};

export const checkShopName = shopName => (dispatch) => {
  fetch(`${URL}/checkShopName`, postOptions({ shopName }))
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { isShopNameAvailable } = responseData;
          dispatch({
            isShopNameAvailable,
            type: PAGES.SHOP_HOME,
          });
          return responseData;
        });
      }
      console.log('Error occurred:');
      console.log(res);
      return { errorMessages: { REQUEST_ERROR: res.statusText } };
    });
};

export const clearShopName = () => (dispatch) => {
  dispatch({
    isShopNameAvailable: null,
    type: PAGES.SHOP_HOME,
  });
};


export const createShop = shopName => (dispatch) => {
  fetch(`${URL}/createShop`, postOptions({ shopName }))
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { myShopInfo } = responseData;
          dispatch({
            myShopInfo: Object.values(myShopInfo),
            type: PAGES.SHOP_HOME,
          });
          return responseData;
        });
      }
      console.log('Error occurred:');
      console.log(res);
      return { errorMessages: { REQUEST_ERROR: res.statusText } };
    });
};

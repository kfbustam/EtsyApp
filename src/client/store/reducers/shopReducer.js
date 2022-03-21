import {
  SET_SHOP_NAME
} from '../actions/actionTypes';

let initialState = {};

if (window != null) {
  initialState = {
    shop: null,
  };
}

const reducer = (state = initialState, action) => {
  const { shopName, type } = action;
  switch (type) {
    case SET_SHOP_NAME:
      return {
        ...state,
        shop: { name: shopName }
      };
    default:
      return state;
  }
};

export default reducer;

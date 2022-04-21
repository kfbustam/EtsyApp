let initialState = {};

if (window != null) {
  initialState = {
    isShopNameAvailable: null,
    myShopInfo: [],
  };
}

const reducer = (state = initialState, action) => {
  const { isShopNameAvailable, myShopInfo } = action;
  return {
    ...state,
    isShopNameAvailable:
      isShopNameAvailable != null ? isShopNameAvailable : state.isShopNameAvailable,
    myShopInfo: myShopInfo != null ? myShopInfo : state.myShopInfo
  };
};

export default reducer;

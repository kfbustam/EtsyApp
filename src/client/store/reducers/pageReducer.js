import {
  PAGES,
  TOGGLE_USER_SETTINGS_MODAL
} from '../actions/actionTypes';

let initialState = {};

if (window != null) {
  initialState = {
    pageView: PAGES.HOME,
    showUserSettingsModal: false
  };
}

const reducer = (state = initialState, action) => {
  const { pageView, showUserSettingsModal, type } = action;
  switch (type) {
    case PAGES.HOME:
      return {
        pageView: pageView ?? PAGES.HOME,
      };
    case PAGES.SHOPPING_ITEM_OVERVIEW:
      return {
        pageView: pageView ?? PAGES.SHOPPING_ITEM_OVERVIEW,
      };
    case TOGGLE_USER_SETTINGS_MODAL:
      return {
        showUserSettingsModal: showUserSettingsModal ?? false
      };
    default:
      return state;
  }
};

export default reducer;

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
  const { showUserSettingsModal, type } = action;
  switch (type) {
    case TOGGLE_USER_SETTINGS_MODAL:
      return {
        ...state,
        showUserSettingsModal: showUserSettingsModal ?? false
      };
    default:
      return {
        ...state,
        pageView: type,
      };
  }
};

export default reducer;

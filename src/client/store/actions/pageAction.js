// eslint-disable-next-line import/prefer-default-export
export const changePageView = actionType => (dispatch) => {
  dispatch({ type: actionType });
};

export const toggleModal = (showModal, type) => (dispatch) => {
  dispatch({ showUserSettingsModal: showModal, type });
};

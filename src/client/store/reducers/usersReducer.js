import jwt from 'jsonwebtoken';
import * as actionTypes from '../actions/actionTypes';

const validCredentials = () => {
  if (typeof window === 'undefined') {
    return false;
  }
  const authorizationToken = localStorage.getItem('jwtToken');
  if (authorizationToken == null) return false;
  try {
    jwt.decode(authorizationToken);
    return true;
  } catch (err) {
    return false;
  }
};

let initialState = {};

if (window != null) {
  const isAuthenticated = validCredentials();
  const jwtDecoded = jwt.decode(localStorage.getItem('jwtToken'));
  initialState = {
    isAuthenticated,
    authenticatedUsername: isAuthenticated && jwtDecoded != null ? jwtDecoded.username : ''
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESSFUL:
      return {
        isAuthenticated: true,
        authenticatedUsername: state.authenticatedUsername ?? '',
      };
    case actionTypes.LOGOUT_USER: {
      return {
        isAuthenticated: false,
        authenticatedUsername: ''
      };
    }
    default:
      return state;
  }
};

export default reducer;

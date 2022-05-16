import jwt from 'jsonwebtoken';
import { LOGIN_SUCCESSFUL, LOGOUT_USER } from '../actions/actionTypes';

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
    authenticatedUsername: isAuthenticated && jwtDecoded != null ? jwtDecoded.username : '',
    user: {
      username: isAuthenticated && jwtDecoded != null ? jwtDecoded.username : '',
    }
  };
}

const reducer = (state = initialState, action) => {
  const { type, updatedUserInfo } = action;
  const { authenticatedUsername, user } = state;
  switch (type) {
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        isAuthenticated: true,
        authenticatedUsername: authenticatedUsername ?? '',
        user: {
          region: 'United States',
          currency: 'USD',
          language: 'English',
          username: authenticatedUsername ?? '',
        }
      };
    case LOGOUT_USER: {
      return {
        ...state,
        isAuthenticated: false,
        authenticatedUsername: '',
      };
    }
    default:
      return {
        ...state,
        user: updatedUserInfo != null ? updatedUserInfo : user
      };
  }
};

export default reducer;

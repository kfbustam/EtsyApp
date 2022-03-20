import jwt from 'jsonwebtoken';
import { LOGIN_SUCCESSFUL, LOGOUT_USER, UPDATE_USER_INFO } from '../actions/actionTypes';

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
      region: 'United States',
      currency: 'USD',
      language: 'English',
      username: jwtDecoded.username
    }
  };
}

const reducer = (state = initialState, action) => {
  const { type, userInfo } = action;
  const { authenticatedUsername, user } = state;
  switch (type) {
    case LOGIN_SUCCESSFUL:
      return {
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
        isAuthenticated: false,
        authenticatedUsername: '',
      };
    }
    case UPDATE_USER_INFO: {
      return {
        ...user,
        ...userInfo
      };
    }
    default:
      return state;
  }
};

export default reducer;

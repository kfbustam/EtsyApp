import jwt from 'jsonwebtoken';
import * as actionTypes from './actionTypes';

const URL = 'http://localhost:8080';
const options = data => ({
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(data)
});

export const userSignupRequest = userSignupDetails => () => fetch(`${URL}/signup`, options(userSignupDetails));

export const userLoginRequest = userLoginDetails => (
  dispatch => fetch(`${URL}/login`, options(userLoginDetails))
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { token } = responseData;
          if (token) {
            delete res.token;
            localStorage.setItem('jwtToken', token);
            dispatch({
              type: actionTypes.LOGIN_SUCCESSFUL,
              authorizationToken: token,
              authenticatedUsername: jwt.decode(token) ? jwt.decode(token).username : '',
            });
          }
          return responseData;
        });
      }
      console.log('Error occurred:');
      console.log(res);
      return { errorMessages: { REQUEST_ERROR: res.statusText } };
    })
);

export const userLogoutRequest = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  dispatch({ type: actionTypes.LOGOUT_USER });
};

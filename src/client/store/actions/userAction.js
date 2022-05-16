import jwt from 'jsonwebtoken';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import {
  LOGIN_SUCCESSFUL, LOGOUT_USER, PAGES
} from './actionTypes';


const URL = 'http://localhost:8080';
const postOptions = data => ({
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify(data)
});

export const updateUserInfo = userInfo => dispatch => fetch(`${URL}/updateUserInfo`, postOptions({ userInfo, jwtKey: localStorage.getItem('jwtToken') }))
  .then((res) => {
    if (res.ok) {
      return res.json().then((responseData) => {
        const { userInfo: updatedUserInfo } = responseData;
        dispatch({
          type: PAGES.PROFILE,
          updatedUserInfo
        });
        return responseData;
      });
    }
    console.log('Error occurred:');
    console.log(res);
    return { errorMessages: { REQUEST_ERROR: res.statusText } };
  });

export const getUserInfo = () => (dispatch) => {
  const client = new ApolloClient({
    uri: `${URL}/graphql`,
  });
  client.query({
    query: gql`
        query Query($jwtString: String) {
          user(jwtString: $jwtString) {
            id,
            username,
            password,
            region,
            currency,
            language,
          }
        }
      `,
    variables: { jwtString: localStorage.getItem('jwtToken') }
  }).then((response) => {
    dispatch({
      type: PAGES.PROFILE,
      updatedUserInfo: response.data.user
    });
    return response;
  })
    .catch(error => console.log(error));
};

export const userSignupRequest = userSignupDetails => () => fetch(`${URL}/signup`, postOptions(userSignupDetails));

export const userLoginRequest = userLoginDetails => (
  dispatch => fetch(`${URL}/login`, postOptions(userLoginDetails))
    .then((res) => {
      if (res.ok) {
        return res.json().then((responseData) => {
          const { token } = responseData;
          if (token) {
            delete res.token;
            localStorage.setItem('jwtToken', token);
            dispatch({
              type: LOGIN_SUCCESSFUL,
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
  dispatch({ type: LOGOUT_USER });
};

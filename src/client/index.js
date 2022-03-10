import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import usersReducer from './store/reducers/usersReducer';
import Dashboard from './Dashboard';

const rootReducer = combineReducers({
  users: usersReducer,
});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>, document.getElementById('root')
);

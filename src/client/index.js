import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import itemReducer from './store/reducers/itemReducer';
import userReducer from './store/reducers/userReducer';
import pageReducer from './store/reducers/pageReducer';
import Dashboard from './Dashboard';

const rootReducer = combineReducers({
  items: itemReducer,
  pages: pageReducer,
  users: userReducer,
});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>, document.getElementById('root')
);

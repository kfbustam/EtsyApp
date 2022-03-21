import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import cartReducer from './store/reducers/cartReducer';
import itemReducer from './store/reducers/itemReducer';
import shopReducer from './store/reducers/shopReducer';
import userReducer from './store/reducers/userReducer';
import pageReducer from './store/reducers/pageReducer';
import purchaseReducer from './store/reducers/purchaseReducer';
import Dashboard from './Dashboard';

const rootReducer = combineReducers({
  cart: cartReducer,
  item: itemReducer,
  page: pageReducer,
  purchase: purchaseReducer,
  shop: shopReducer,
  user: userReducer,
});
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <Dashboard />
  </Provider>, document.getElementById('root')
);

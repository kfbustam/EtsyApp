import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import {
  createStore, applyMiddleware, combineReducers
} from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';
import cartReducer from './store/reducers/cartReducer';
import itemReducer from './store/reducers/itemReducer';
import shopReducer from './store/reducers/shopReducer';
import userReducer from './store/reducers/userReducer';
import pageReducer from './store/reducers/pageReducer';
import purchaseReducer from './store/reducers/purchaseReducer';
import Dashboard from './Dashboard';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  item: itemReducer,
  page: pageReducer,
  purchase: purchaseReducer,
  shop: shopReducer,
  user: userReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));

const persistedStore = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistedStore}>
      <Dashboard />
    </PersistGate>
  </Provider>, document.getElementById('root')
);

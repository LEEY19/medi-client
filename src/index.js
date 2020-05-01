import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import createHistory from 'history/createBrowserHistory';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Context from './contexts';
import thunkMiddleware from 'redux-thunk';

import root from 'window-or-global';

import App from './containers/App';

import * as InitialStates from './lib/initialStates';

import * as UserContext from './contexts/user';
import * as FileContext from './contexts/file';

root.__baseURL__ = "http://localhost:8080/";

const history = createHistory();

const createRootReducer = (history) => combineReducers({
  user: UserContext.reducer,
  files: FileContext.reducer,
  router: connectRouter(history),
})

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['user', 'files', 'router']
}

const configureStore = initialState => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware, routerMiddleware(history)),
  );

  return createStore(persistReducer(persistConfig, createRootReducer(history)), initialState, enhancer);
};

const store = configureStore({ user: InitialStates.user, files: InitialStates.files })
const persistor = persistStore(store);

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


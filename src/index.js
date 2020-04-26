import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { BrowserRouter as Router } from 'react-router-dom';
import * as Context from './contexts';
import thunkMiddleware from 'redux-thunk';
import Store from './store';
// import root from 'window-or-global';

import App from './containers/App';
// import Store from './store';
// import * as Context from './contexts';
// import Cookie from './lib/cookie';
// import './assets/css/index.css';
const history = createHistory();

const initialState = new Store();

const createRootReducer = (history) => combineReducers({
  ...Context.reducer,
  router: connectRouter(history),
})

// const store = createStore(
//   createRootReducer(history),
//   initialState,
//   applyMiddleware(thunkMiddleware, routerMiddleware(history))
// );

const configureStore = initialState => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunkMiddleware, routerMiddleware(history)),
  );

  return createStore(createRootReducer(history), initialState, enhancer);
};

const store = configureStore(initialState);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// serviceWorker.unregister();

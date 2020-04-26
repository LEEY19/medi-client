import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { connectRouter, ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { BrowserRouter as Router } from 'react-router-dom';
// import thunkMiddleware from 'redux-thunk';
// import root from 'window-or-global';

import App from './containers/App';
// import Store from './store';
// import * as Context from './contexts';
// import Cookie from './lib/cookie';
// import './assets/css/index.css';
const history = createHistory();

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history)
})

const store = createStore(
  createRootReducer(history),
  applyMiddleware(routerMiddleware(history))
);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

// serviceWorker.unregister();

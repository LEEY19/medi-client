import React from 'react';
// import { Provider } from 'react-redux';
import { render } from 'react-dom';
// import { createStore, applyMiddleware, compose } from 'redux';
// import createHistory from 'history/createBrowserHistory';
// import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
// import thunkMiddleware from 'redux-thunk';
// import root from 'window-or-global';

import App from './containers/App';
// import Store from './store';
// import * as Context from './contexts';
// import Cookie from './lib/cookie';
// import './assets/css/index.css';


render(
  <App />,
  document.getElementById('root')
);

// serviceWorker.unregister();

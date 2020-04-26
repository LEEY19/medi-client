import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../components/Loading';

// let match = useRouteMatch();

export default class App extends Component {

  render() {
    return (
      <Switch>
        <Route
          path='/'
          exact={true}
          component={Loadable({
            loader: () => import('./SignUp'),
            loading: Loading,
          })}
        />
        <Route
          path='/login'
          exact={true}
          component={Loadable({
            loader: () => import('./LogIn'),
            loading: Loading,
          })}
        />
      </Switch>
    );
  }
}



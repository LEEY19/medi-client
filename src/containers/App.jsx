import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../components/Loading';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact={true}
            component={Loadable({
              loader: () => import('./SignUp'),
              loading: Loading,
            })}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;

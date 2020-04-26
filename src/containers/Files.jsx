import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { push } from 'connected-react-router'
// import { makeStyles, withStyles, withTheme } from '@material-ui/core/styles';
// import LockIcon from '@material-ui/icons/Lock';

import * as FileContext from '../contexts/file';

class Files extends Component {
  componentDidMount() {
    var user = this.state.user;
    debugger;
  }

  render() {
    return (
      <p></p>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  getFiles: () => dispatch(FileContext.getFiles()),
  // logIn: (email, password) => dispatch(UserContext.logIn(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Files);
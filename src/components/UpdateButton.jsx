import React, { Component } from 'react';

import { 
  Button, 
} from '@material-ui/core';


export default class UpdateButton extends Component {

  render() {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={() => this.props.updateFile(this.props.id)}
      >
        Update File
      </Button>
    );
  }
};
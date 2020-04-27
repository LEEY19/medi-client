import React, { Component } from 'react';

import { 
  Button, 
} from '@material-ui/core';

export default class DeleteButton extends Component {

  render() {
    return (
      <Button
        variant="contained"
        color="secondary"
        onClick={() => this.props.deleteFile(this.props.id)}
      >
        Delete File
      </Button>
    );
  }
};
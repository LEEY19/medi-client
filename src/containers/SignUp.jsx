import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router'
import { makeStyles, withStyles, withTheme } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import { 
  Button, 
  Avatar, 
  TextField, 
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container
} from '@material-ui/core';

import * as UserContext from '../contexts/user';

const useStyles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    alignSelf: 'center',
    margin: theme.spacing(1),
    backgroundColor: 'red',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: null,
      password: null,
      error: false,
      userMessage: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.userMessage !== this.props.user.userMessage) {
      this.setState({userMessage: this.props.user.userMessage});
    }
  }

  componentWillUnmount() {
    if (this.state.userMessage) {
      this.props.removeMessage()
    }
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const { email, password, userMessage } = this.state;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  onChange={this.handleEmailChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  onChange={this.handlePasswordChange}
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => this.props.signUp(email, password)}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => this.props.toLogIn()}>
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        {userMessage 
          ? (
              <p>{userMessage}</p>
          ) : null
        }
      </Container>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  toLogIn: () => dispatch(push('/login')),
  signUp: (email, password) => dispatch(UserContext.signUp(email, password)),
  removeMessage: (email, password) => dispatch(UserContext.removeMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(SignUp));


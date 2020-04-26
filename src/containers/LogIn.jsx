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

class LogIn extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log In
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
                  autoComplete="email"
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
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Log In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link variant="body2" onClick={() => this.props.toSignUp()}>
                  Don't have an account yet? Sign up here
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    );
  }
};

const mapStateToProps = (state, ownProps) => ({
  location: ownProps.location
});

const mapDispatchToProps = dispatch => ({
  toSignUp: () => dispatch(push('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles)(LogIn));
// export default withStyles(useStyles)(LogIn)

import API from '../lib/api';
import * as InitialStates from '../lib/initialStates';
import createReducer from '../lib/createReducer';
import { push } from 'connected-react-router'
// import root from 'window-or-global'

//types
export const SET_USER = 'SET_USER';
export const LOG_OUT = 'LOG_OUT';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE';

//actions

const loginFailed = () => {
  return { type: LOGIN_FAILED }
}

const signupFailed = () => {
  return { type: SIGNUP_FAILED }
}

const signupSuccess = () => {
  return { type: SIGNUP_SUCCESS }
}

export const removeMessage = () => {
  return { type: REMOVE_MESSAGE }
}

export function signUp(email, password) {
  return (dispatch, getState) => {
    let signup_details = Object.assign(
      {},
      { email, password }
    );
    let token = getState().user.token;
    // console.log({token: token})

    return API.post(`/api/users`, token, signup_details)
      .then(response => {
        dispatch(signupSuccess());
        setTimeout(() => {
          dispatch(push('/login'));
        }, 2000);
      })
      .catch(error => {
        console.log(error)
        dispatch(signupFailed());
      });
  };
}

export function logIn(email, password) {
  return (dispatch, getState) => {
    let login_details = Object.assign(
      {},
      { email, password }
    );
    let token = getState().user.token;

    return API.post(`/api/users/login`, token, login_details)
      .then(response => {
        // debugger
        const payload = {
          type: SET_USER,
          user: response.data.user,
        };
        dispatch(payload);
        dispatch(push('/files'));
      })
      .catch(error => {
        dispatch(loginFailed());
      });
  };
}

export function logOut(email) {
  return (dispatch, getState) => {
    let logout_details = Object.assign(
      {},
      { email }
    );
    let token = getState().user.token;
    return API.post(`/api/users/logout`, token, logout_details)
      .then(response => {
        const payload = {
          type: LOG_OUT,
        };
        dispatch(payload);
        dispatch(push('/login'));
      })
      .catch(error => {
        console.log(error);
      });
  };
}


// reducers

export const reducer = createReducer(InitialStates.user, {
  [SET_USER](state, action) {
    return Object.assign({}, state, action.user);
  },
  [LOG_OUT](state, action) {
    return Object.assign({}, state, {email: null, token: null});
  },
  [LOGIN_FAILED](state, action) {
    return Object.assign({}, state, { error: true, userMessage: "Unable to log in, make sure account is created and credentials are correct." });
  },
  [SIGNUP_SUCCESS](state, action) {
    return Object.assign({}, state, { error: false, userMessage: "Successful sign up. Now log in." });
  },  
  [SIGNUP_FAILED](state, action) {
    return Object.assign({}, state, { error: true, userMessage: "Unable to sign up." });
  },
  [REMOVE_MESSAGE](state, action) {
    return Object.assign({}, state, { error: false, userMessage: null });
  },
});


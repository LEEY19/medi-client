import API from '../lib/api';
import * as Reducer from '../lib/reducer';
import { push } from 'connected-react-router'
import root from 'window-or-global'

//types
export const SET_USER = 'SET_USER';

//actions
export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const signUp = (email, password) => dispatch => {
  let signup_details = Object.assign(
    {},
    { email, password }
  );
  return API.post(`/api/users`, signup_details)
    // .then(res => dispatch(setUser(res.data)))
    .then(res => {
      // dispatch(setUser(res.data.user));
      dispatch(push('/login'));
    })
    .catch(err => {
      console.log(err);
    });
};

export const logIn = (email, password) => dispatch => {
  let login_details = Object.assign(
    {},
    { email, password }
  );

  return API.post(`/api/users/login`, login_details)
    // .then(res => dispatch(setUser(res.data)))
    .then(res => {
      root.__TOKEN__ = res.data.user.token;
      dispatch(setUser(res.data.user));
      dispatch(push('/files'));
    })
    .catch(err => {
      console.log(err);
    });
};

// reducers
export const reducer = Reducer.matchWith({
  [SET_USER]: (state, action) => state.merge(action.payload),
});

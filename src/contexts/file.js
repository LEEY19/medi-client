import API from '../lib/api';
import * as Reducer from '../lib/reducer';
import { push } from 'connected-react-router'
import root from 'window-or-global'

//types
// export const SET_USER = 'SET_USER';

//actions
// export const setUser = user => ({
//   type: SET_USER,
//   payload: user,
// });

export const getFiles = () => dispatch => {

  return API.get(`/api/users/current`)
    // .then(res => dispatch(setUser(res.data)))
    .then(res => {
      console.log("win")
      // dispatch(push('/login'));
    })
    .catch(err => {
      console.log(err);
    });
};


// reducers
export const reducer = Reducer.matchWith({
  // [SET_USER]: (state, action) => state.merge(action.payload),
});

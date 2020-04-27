import { combineReducers } from 'redux';
import * as UserContext from './user';
import * as FileContext from './file';
// import { routerReducer } from 'react-router-redux';

export const appReducer = combineReducers(
  Object.assign(
    {},
    {
    user: UserContext.reducer,
    files: FileContext.reducer
    },
  // router: routerReducer,
));

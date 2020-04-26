import * as Reducer from '../lib/reducer';
import * as UserContext from './user';
// import { routerReducer } from 'react-router-redux';

export const reducer = Reducer.combine({
  user: UserContext.reducer,
  // router: routerReducer,
});

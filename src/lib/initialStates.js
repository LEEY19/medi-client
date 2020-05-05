import { OrderedMap, Map } from 'immutable';


//user store
export const user = {
  email: null,
  token: null,
  error: false,
  userMessage: null
};

// files store
export const files = {
  files: [],
  gettingFiles: false,
  fileMessage: null
};
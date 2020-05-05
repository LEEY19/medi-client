import API from '../lib/api';
import * as InitialStates from '../lib/initialStates';
import createReducer from '../lib/createReducer';
import { push } from 'connected-react-router'

//types
export const SET_FILES = 'SET_FILES';
export const CLEAR_FILE_STATE = 'CLEAR_FILE_STATE';
export const TOGGLE_FILE_LOADING = 'TOGGLE_FILE_LOADING';
export const INSERT_FILE_MESSAGE = 'INSERT_FILE_MESSAGE';
export const APPEND_FILE = 'APPEND_FILE';
export const REMOVE_FILE = 'REMOVE_FILE';
export const LOG_OUT = 'LOG_OUT';
//actions

const insertFileMessage = (message) => {
  return { type: INSERT_FILE_MESSAGE, message }
}

export function getFiles() {
  return (dispatch, getState) => {

    let token = getState().user.token;

    if (!token) { return dispatch(push('/login')) };

    dispatch({type: TOGGLE_FILE_LOADING});
    return API.get(`/api/files/all`, token)
      .then(response => {
        // debugger;
        const payload = {
          type: SET_FILES,
          files: response.data,
        };
        dispatch(payload);
        dispatch({type: TOGGLE_FILE_LOADING});
      })
      .catch(err => {
        if (err.response && err.response.status === 401) {
          dispatch(push('/login'))
        }
      });
  };
}

export function clearFileState() {
  return (dispatch) => {
    dispatch({type: CLEAR_FILE_STATE});
  };
}

export function uploadFile(file) {
  return (dispatch, getState) => {

    let token = getState().user.token;

    if (!token) { return dispatch(push('/login')) };

    dispatch({type: TOGGLE_FILE_LOADING});
    const formData = new FormData(); 
     
    // Update the formData object 
    formData.append('uploadfile', file); 

    return API.post(`/api/files/upload`, token, formData)
      .then(response => {
        const payload = {
          type: APPEND_FILE,
          file: {id: response.data.id, name: response.data.file.originalname, filepath: response.data.filepath + response.data.file.originalname},
        };
        dispatch(payload);
        dispatch(insertFileMessage(response.data.msg));
        dispatch({type: TOGGLE_FILE_LOADING});
      })
      .catch(err => {
        console.log(err);
      });
  };
}

export function deleteFile(id) {
  return (dispatch, getState) => {

    let token = getState().user.token;

    if (!token) { return dispatch(push('/login')) };

    dispatch({type: TOGGLE_FILE_LOADING});

    return API.delete(`/api/files/deletefile/${id}`, token)
      .then(response => {
        if (response.status == 200) {
          const payload = {
            type: REMOVE_FILE,
            id
          };
          dispatch(payload);
          dispatch(insertFileMessage(response.data.msg));
        };
        dispatch({type: TOGGLE_FILE_LOADING});
      })
      .catch(err => {
        console.log(err);
      });
  };
}

// reducers
export const reducer = createReducer(InitialStates.files, {
  [SET_FILES](state, action) {
    return Object.assign({}, state, action.files);
  },
  [CLEAR_FILE_STATE](state, action) {
    return Object.assign({}, state, {files: [], gettingFiles: false, fileMessage: null});
  },
  [INSERT_FILE_MESSAGE](state, action) {
    return Object.assign({}, state, {fileMessage: action.message});
  },
  [APPEND_FILE](state, action) {
    var existing_files = state.files;
    existing_files.push(action.file);
    return Object.assign({}, state, {files: existing_files});
  },
  [REMOVE_FILE](state, action) {
    var existing_files = state.files;
    existing_files = existing_files.filter((value) => {
      return value.id !== action.id 
    })
    return Object.assign({}, state, {files: existing_files});
  },  
  [TOGGLE_FILE_LOADING](state, action) {
    return Object.assign({}, state, {gettingFiles: !state.gettingFiles});
  },
  [LOG_OUT](state, action) {
    return Object.assign({}, state, {files: [], gettingFiles: false});
  },
});
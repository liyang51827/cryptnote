import api from '../utils/api';
import { GET_USER_MESSAGES, GET_USER_FILES } from './types';

//get usermessage
export const getUserMessages = (data) => async (dispatch) => {
  try {
    console.log('getusermessages');
    const res = await api.post('/message/user', data);
    console.log(res);

    dispatch({
      type: GET_USER_MESSAGES,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
}

// add one view to note
export const addOneViewToMsg = (data) => async (dispatch) => {
  try {
    console.log('addOneViewToMsg');
    console.log(data);
    const res = await api.post('/users/addoneview', data);

    if (res) {
      dispatch(getUserMessages());
    }
  } catch (error) {
    
  }
}

//get userfile
export const getUserFiles = (data) => async (dispatch) => {
  try {
    console.log('getuserfiles');
    const res = await api.post('/file/user', data);
    console.log(res);

    dispatch({
      type: GET_USER_FILES,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
  }
}

// add one view to note
export const addOneViewToFile = (data) => async (dispatch) => {
  try {
    console.log('addOneViewToFile');
    console.log(data);
    const res = await api.post('/users/addoneview', data);

    if (res) {
      dispatch(getUserFiles());
    }
  } catch (error) {
    
  }
}
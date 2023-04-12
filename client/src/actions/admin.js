import api from '../utils/api';
import { setAlert } from './alert';
import {
  GET_USERS,
  GET_MESSAGES,
  GET_FILES,
  GET_ADMININFO,
  GET_PAYSETTING
} from './types';

// Load User
export const getUsers = () => async (dispatch) => {
  try {
    console.log('getusers')
    const res = await api.get('/admin/users');
    console.log(res.data);
    dispatch({
      type: GET_USERS,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};


// Load Message 
export const getMessages = () => async (dispatch) => {
  try {
    console.log('getmessages')
    const res = await api.get('/admin/messages');
    console.log(res.data);
    dispatch({
      type: GET_MESSAGES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

// Load Files 
export const getFiles = () => async (dispatch) => {
  try {
    console.log('getfiles')
    const res = await api.get('/admin/files');
    console.log(res.data);
    dispatch({
      type: GET_FILES,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
};

// Get admin info
export const getAdminInfo = () => async (dispatch) => {
  try {
    console.log('getAdminInfo');
    const res = await api.get('/admin/user');
    console.log(res.data);
    dispatch({
      type: GET_ADMININFO,
      payload: res.data
    });
  } catch (err) {
    console.log(err);
  }
}

// Change pwd
export const changePwd = (data) => async (dispatch) => {
  try {
    console.log('changePwd');
    const res = await api.post('/admin/user', data);
    console.log(res);
    if (res.data === 'success') {
      dispatch(setAlert('Password successfully changed!', 'success'));
    }
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

// get paysetting
export const getPaySetting = () => async (dispatch) => {
  try {
    console.log('getPaySetting');
    const res = await api.get('/admin/paysetting');
    console.log(res);
    
    dispatch({
      type: GET_PAYSETTING,
      payload: res.data
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

// post paysetting
export const setPaySetting = (data) => async (dispatch) => {
  try {
    console.log('setPaySetting');
    const res = await api.post('/admin/paysetting', data);
    console.log(res);
    
    dispatch(
      getPaySetting()
    )
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

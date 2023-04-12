import api from '../utils/api';
import { setAlert } from './alert';
import {
  SUBMIT_FILE,
  GET_PASSWORD,
} from './types';

// Submit file
export const submitFile = (data, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/file/enc', data);
    dispatch({
      type: SUBMIT_FILE,
      payload: res.data
    });
    console.log(res.data);
    dispatch(setAlert('File upload', 'success'));

    navigate('/file/link');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

// get password
export const getPassword = (id, navigate) => async (dispatch) => {
  console.log('get password');
  try {
    const res = await api.get(`/file/dec/password/${id}`);
    if (res.data === 'notExist') {
      navigate('/notFound');
    }
    dispatch({
      type: GET_PASSWORD,
      payload: res.data
    });

    console.log(res.data);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

// get message
export const getFile = (data, navigate) => async (dispatch) => {
  console.log('get file');
  try {
    const res = await api.post('/file/dec/file/', data, { responseType: 'blob' });
    console.log(res.data);
    const filename = res.headers.filename;
  
    if (res.data === 'notExist') {
      navigate('/notFound');
      return;
    }
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    if (typeof window.navigator.msSaveBlob === 'function') {
      // IE / MS Edge
      console.log('if')
      console.log(res.data)
      window.navigator.msSaveBlob(res.data, 'download');
    } else {
      // Casual case
      console.log('else');
      console.log(link);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    }
  } catch (err) {
    console.log(err);
    const errors = err.response && err.response.data && err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}

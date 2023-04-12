import api from '../utils/api';
import { setAlert } from './alert';
import {
  SUBMIT_MESSAGE,
  GET_PASSWORD,
  GET_MESSAGE
} from './types';

// Submit message
export const submitMessage = (data, navigate) => async (dispatch) => {
  try {
    const res = await api.post('/message/enc', data);
    dispatch({
      type: SUBMIT_MESSAGE,
      payload: res.data
    });
    console.log(res.data);
    dispatch(setAlert('Message created', 'success'));

    navigate('/message/link');
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
    const res = await api.get(`/message/dec/password/${id}`);
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
export const getMessage = (data, navigate) => async (dispatch) => {
  console.log('get message');
  try {
    const res = await api.post('/message/dec/message/', data);
    if (res.data === 'notExist') {
      navigate('/notFound');
    }
    dispatch({
      type: GET_MESSAGE,
      payload: res.data
    });
    console.log(res.data);

    navigate(`/message/view/${data.id}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}
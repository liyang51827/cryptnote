import api from '../utils/api';
import {
  POST_PAYMENT,
  GET_PAYMENT,
  GET_PAYMENTS
} from './types';

// get payments log of all users
export const getPaymentsLog = () => async (dispatch) => {
  try {
    console.log('getPaymentLog');
    const res = await api.get('/payment');
    console.log(res);
    dispatch({
      type: GET_PAYMENTS,
      payload: res.data
    });
  } catch (error) {
    console.log(error)
  }
};

// get payment log of user
export const getPaymentLog = (data) => async (dispatch) => {
  try {
    console.log('getPaymentsLog');
    const res = await api.post('/payment/user', data);
  
    dispatch({
      type: GET_PAYMENT,
      payload: res.data
    });
  } catch (error) {
    console.log(error)
  }
};

// submit license
export const submitLicense = (data) => async (dispatch) => {
  try {
    console.log('submitLicense');
    const res = await api.post('/payment/addlicense', data);
    console.log(res);
    if (res) {
      dispatch(getPaymentsLog());
    }
  } catch (error) {
    
  }
}

// post payment log of user
export const postPaymentLog = (data) => async (dispatch) => {
  try {
    console.log('postPaymentLog');
    const res = await api.get('/payment', data);
  
    dispatch({
      type: POST_PAYMENT,
      payload: res.data
    });
  } catch (error) {
    console.log(error)
  }
};
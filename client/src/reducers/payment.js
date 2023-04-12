import {
  POST_PAYMENT,
  GET_PAYMENT,
  GET_PAYMENTS
} from '../actions/types';

const initialState = {
  payments: [],
  payment: null,
  errors: []
};

const paymentReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case POST_PAYMENT:
      return {
        ...state,
        payment: payload,
        loading: false
      };
    case GET_PAYMENT:
      return {
        ...state,
        payments: payload,
        loading: false
      };
    case GET_PAYMENTS:
      return {
        ...state,
        payments: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default paymentReducer;
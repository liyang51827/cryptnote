import {
  SUBMIT_MESSAGE,
  GET_PASSWORD,
  GET_MESSAGE
} from '../actions/types';

const initialState = {
  link: '',
  message: '',
  password: false,
  loading: true,
  errors: []
};

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SUBMIT_MESSAGE:
      return {
        ...state,
        link: payload,
        loading: false
      };
    case GET_PASSWORD:
      return {
        ...state,
        password: payload,
        loading: false
      };
    case GET_MESSAGE:
      return {
        ...state,
        message: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default messageReducer;
import {
  SUBMIT_FILE,
  GET_PASSWORD,
} from '../actions/types';

const initialState = {
  link: '',
  // message: '',
  password: false,
  loading: true,
  errors: []
};

const fileReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SUBMIT_FILE:
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
    default:
      return state;
  }
}

export default fileReducer;
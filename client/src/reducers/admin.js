import {
  GET_USERS,
  GET_MESSAGES,
  GET_FILES,
  GET_ADMININFO,
  GET_PAYSETTING
} from '../actions/types';

const initialState = {
  users: [],
  messages: [],
  files: [],
  paysetting: null,
  info: null,
  loading: true,
  errors: []
};

const adminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false
      };
    case GET_MESSAGES:
      return {
        ...state,
        messages: payload,
        loading: false
      };
    case GET_FILES:
      return {
        ...state,
        files: payload,
        loading: false
      };
    case GET_ADMININFO:
      return {
        ...state,
        info: payload,
        loading: false
      };
    case GET_PAYSETTING:
      return {
        ...state,
        paysetting: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default adminReducer;
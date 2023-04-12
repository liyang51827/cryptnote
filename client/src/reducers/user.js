import { GET_USER_MESSAGES, GET_USER_FILES } from "../actions/types";

const initialState = {
  messages: [],
  files: [],
  loading: true,
  errors: []
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USER_MESSAGES:
      return {
        ...state,
        messages: payload,
        loading: false
      };
    case GET_USER_FILES:
      return {
        ...state,
        files: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default userReducer;
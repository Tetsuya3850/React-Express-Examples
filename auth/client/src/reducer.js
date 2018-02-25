import { AUTH_USER, UNAUTH_USER, AUTH_FAIL } from "./actions";

const initialState = {
  isAuthed: false,
  errors: {},
  userInfo: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        isAuthed: true,
        errors: {},
        userInfo: action.userInfo
      };
    case UNAUTH_USER:
      return {
        isAuthed: false,
        errors: {},
        userInfo: {}
      };
    case AUTH_FAIL:
      return {
        ...state,
        errors: action.errors
      };
    default:
      return state;
  }
};

export default authReducer;

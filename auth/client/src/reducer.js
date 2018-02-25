import { AUTH_USER, UNAUTH_USER, REGISTER_FAIL, LOGIN_FAIL } from "./actions";

const initialState = {
  isAuthed: false,
  registerErrors: {},
  loginErrors: {},
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
    case REGISTER_FAIL:
      return {
        ...state,
        registerErrors: action.registerErrors
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginErrors: action.loginErrors
      };
    default:
      return state;
  }
};

export default authReducer;

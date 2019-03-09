import api from "./api";
import { saveToken, removeToken, parseToken, isAuthed } from "./tokenUtils";

const AUTH_USER = "AUTH_USER";
const UNAUTH_USER = "UNAUTH_USER";
const SIGNUP_ERROR = "SIGNUP_ERROR";
const SIGNIN_ERROR = "SIGNIN_ERROR";
const GET_USER = "GET_USER";

const authUser = payload => ({
  type: AUTH_USER,
  payload
});

const unAuthUser = () => ({
  type: UNAUTH_USER
});

const signupError = error => ({
  type: SIGNUP_ERROR,
  error
});

const signinError = error => ({
  type: SIGNIN_ERROR,
  error
});

const getUser = payload => ({
  type: GET_USER,
  payload
});

export const handleSignup = (payload, redirectCallBack) => async dispatch => {
  try {
    const { data } = await api.signup(payload);
    saveToken(data.token);
    const { _id } = parseToken();
    dispatch(authUser(_id));
    redirectCallBack();
  } catch (error) {
    console.log(error);
    if (error.response) {
      const { data } = error.response;
      dispatch(signupError(data));
    }
  }
};

export const handleSignin = (payload, redirectCallBack) => async dispatch => {
  try {
    const { data } = await api.signin(payload);
    saveToken(data.token);
    const { _id } = parseToken();
    dispatch(authUser(_id));
    redirectCallBack();
  } catch (error) {
    console.log(error);
    if (error.response) {
      const { data } = error.response;
      dispatch(signinError(data));
    }
  }
};

export const reAuthUser = () => async dispatch => {
  const token_info = isAuthed();
  if (token_info) {
    dispatch(authUser(token_info._id));
  }
};

export const handleSignout = redirectCallBack => async dispatch => {
  removeToken();
  dispatch(unAuthUser());
  redirectCallBack();
};

export const handleGetUser = () => async dispatch => {
  try {
    const { data } = await api.getUser();
    dispatch(getUser(data));
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  uid: null,
  userInfo: {},
  signupError: {},
  signinError: {}
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        uid: action.payload,
        signupError: {},
        signinError: {}
      };
    case UNAUTH_USER:
      return {
        ...state,
        uid: null,
        userInfo: {},
        signupError: {},
        signinError: {}
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        signupError: action.error
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        signinError: action.error
      };
    case GET_USER:
      return {
        ...state,
        userInfo: action.payload
      };
    default:
      return state;
  }
};

export default appReducer;

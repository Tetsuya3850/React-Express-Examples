import api from "./api";
import {
  saveToken,
  removeToken,
  getUserInfo,
  parseToken,
  formatErrors
} from "./utils";

export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const LOGIN_FAIL = "LOGIN_FAIL";

const authUser = userInfo => {
  return {
    type: AUTH_USER,
    userInfo
  };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

const registerFail = errors => {
  return {
    type: REGISTER_FAIL,
    registerErrors: errors
  };
};

const loginFail = errors => {
  return {
    type: LOGIN_FAIL,
    loginErrors: errors
  };
};

export const registerUser = (userInfo, redirect) => async dispatch => {
  try {
    let { data } = await api.register(userInfo);
    await saveToken(data.token);
    dispatch(authUser(data.userInfo));
    redirect();
  } catch (e) {
    let { data } = e.response;
    const formattedErrors = formatErrors(data);
    dispatch(registerFail(formattedErrors));
  }
};

export const loginUser = (userInfo, redirect) => async dispatch => {
  try {
    let { data } = await api.login(userInfo);
    await saveToken(data.token);
    dispatch(authUser(data.userInfo));
    redirect();
  } catch (e) {
    let { data } = e.response;
    dispatch(loginFail(data));
  }
};

export const socialAuthUser = (token, redirect) => async dispatch => {
  await saveToken(token);
  dispatch(authUser(parseToken(token)));
  redirect();
};

export const tokenAuthUser = redirect => async dispatch => {
  const userInfo = await getUserInfo();
  if (userInfo && userInfo.exp >= Date.now() / 1000) {
    dispatch(authUser(userInfo));
    redirect();
  }
};

export const logoutUser = redirect => async dispatch => {
  await removeToken();
  dispatch(unAuthUser());
  redirect();
};

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
        registerErrors: {},
        loginErrors: {},
        userInfo: action.userInfo
      };
    case UNAUTH_USER:
      return {
        isAuthed: false,
        registerErrors: {},
        loginErrors: {},
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

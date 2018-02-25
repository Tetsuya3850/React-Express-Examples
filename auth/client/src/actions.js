import api from "./api";
import { saveToken, removeToken, getUserInfo, formatErrors } from "./helper";

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

export const registerUser = (userInfo, cb) => async dispatch => {
  const response = await api.register(userInfo);
  if (response.userInfo) {
    saveToken(response.token);
    dispatch(authUser(response.userInfo));
    cb();
  } else {
    const formattedErrors = formatErrors(response);
    dispatch(registerFail(formattedErrors));
  }
};

export const loginUser = (userInfo, cb) => async dispatch => {
  const response = await api.login(userInfo);
  if (response.userInfo) {
    saveToken(response.token);
    dispatch(authUser(response.userInfo));
    cb();
  } else {
    dispatch(loginFail(response));
  }
};

export const reAuthUser = () => async dispatch => {
  const userInfo = getUserInfo();
  if (userInfo && userInfo.exp >= Date.now() / 1000) {
    dispatch(authUser(userInfo));
  } else if (userInfo && userInfo.exp < Date.now() / 1000) {
    // TODO: Redirect User to Login Page
  }
};

export const logoutUser = () => async dispatch => {
  removeToken();
  dispatch(unAuthUser());
};

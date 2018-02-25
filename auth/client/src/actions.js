import api from "./api";
import { saveToken, removeToken, getUserInfo, formatErrors } from "./helper";

export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";
export const AUTH_FAIL = "AUTH_FAIL";

const authUser = userInfo => {
  return {
    type: AUTH_USER,
    userInfo
  };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

const authFail = errors => {
  return {
    type: AUTH_FAIL,
    errors
  };
};

export const registerUser = userInfo => async dispatch => {
  const response = await api.register(userInfo);
  if (response.userInfo) {
    saveToken(response.token);
    dispatch(authUser(response.userInfo));
  } else {
    const formattedErrors = formatErrors(response);
    dispatch(authFail(formattedErrors));
  }
};

export const loginUser = userInfo => async dispatch => {
  const data = await api.login(userInfo);
  if (!data.userInfo) {
    return data;
  }
  saveToken(data.token);
  dispatch(authUser(data.userInfo));
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

import api from "./api";
import { saveToken, removeToken, getUserInfo } from "./helper";

export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";

const authUser = userInfo => {
  return {
    type: AUTH_USER,
    userInfo
  };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

export const registerUser = userInfo => async dispatch => {
  const data = await api.register(userInfo);
  if (!data.userInfo) {
    return data;
  }
  saveToken(data.token);
  dispatch(authUser(data.userInfo));
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

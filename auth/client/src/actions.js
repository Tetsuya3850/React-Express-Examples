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

const registerUser = userInfo => async dispatch => {
  const data = await api.register(userInfo);
  saveToken(data.token);
  dispatch(authUser(data.userInfo));
};

const loginUser = userInfo => async dispatch => {
  const data = await api.login(userInfo);
  saveToken(data.token);
  dispatch(authUser(data.userInfo));
};

const reAuthUser = () => async dispatch => {
  const userInfo = getUserInfo();
  if (userInfo && userInfo.exp > Date.now() / 1000) {
    dispatch(authUser(userInfo));
  }
};

const logoutUser = () => async dispatch => {
  removeToken();
  dispatch(unAuthUser());
};

const actions = {
  registerUser,
  loginUser,
  reAuthUser,
  logoutUser
};
export default actions;

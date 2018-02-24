import api from "./api";
import { saveToken } from "./helper";

export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";

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

const authUser = userInfo => {
  return {
    type: AUTH_USER,
    userInfo
  };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

const actions = {
  registerUser,
  loginUser,
  authUser,
  unAuthUser
};
export default actions;

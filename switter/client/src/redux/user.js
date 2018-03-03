import {
  saveToken,
  removeToken,
  getUserInfo,
  parseToken,
  formatErrors
} from "../helper";

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

export const socialAuthUser = (token, redirect) => async dispatch => {
  saveToken(token);
  dispatch(authUser(parseToken(token)));
  redirect();
};

export const reAuthUser = redirect => async dispatch => {
  const userInfo = getUserInfo();
  if (userInfo && userInfo.exp >= Date.now() / 1000) {
    dispatch(authUser(userInfo));
  } else if (userInfo && userInfo.exp < Date.now() / 1000) {
    redirect();
  }
};

export const logoutUser = redirect => async dispatch => {
  removeToken();
  dispatch(unAuthUser());
  redirect();
};

const initialState = {
  isAuthed: false,
  userInfo: {}
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        isAuthed: true,
        userInfo: action.userInfo
      };
    case UNAUTH_USER:
      return {
        isAuthed: false,
        userInfo: {}
      };
    default:
      return state;
  }
};

export default user;

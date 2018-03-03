import {
  saveToken,
  removeToken,
  getUserInfo,
  parseToken,
  formatErrors
} from "../helper";

export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";
export const ADD_OWN_SWEET = "ADD_OWN_SWEET";

const authUser = userInfo => {
  return { type: AUTH_USER, userInfo };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

export const addOwnSweet = sweet => {
  return { type: ADD_OWN_SWEET, sweet };
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
  userInfo: {},
  sweets: []
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        userInfo: action.userInfo
      };
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false,
        userInfo: {}
      };
    case ADD_OWN_SWEET:
      return {
        ...state,
        sweets: [...state.sweets, action.sweet]
      };
    default:
      return state;
  }
};

export default user;

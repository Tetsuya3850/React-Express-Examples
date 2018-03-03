import { saveToken, removeToken, getUserInfo, parseToken } from "../helper";
import { getOwnSweets } from "../api";

export const AUTH_USER = "AUTH_USER";
export const UNAUTH_USER = "UNAUTH_USER";
export const RECEIVE_OWN_SWEETS = "ADD_OWN_SWEETS";
export const ADD_OWN_SWEET = "ADD_OWN_SWEET";

const authUser = userInfo => {
  return { type: AUTH_USER, userInfo };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

const receiveOwnSweets = sweets => {
  return { type: RECEIVE_OWN_SWEETS, sweets };
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

export const receiveOwnSweetsThunk = uid => async dispatch => {
  const sweets = await getOwnSweets(uid);
  console.log(sweets);
  dispatch(receiveOwnSweets(sweets));
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
    case RECEIVE_OWN_SWEETS:
      return {
        ...state,
        sweets: action.sweets
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

import { saveToken, removeToken, getUserInfo, parseToken } from "../helper";
import { getUser } from "../api";

const AUTH_USER = "AUTH_USER";
const UNAUTH_USER = "UNAUTH_USER";
const RECEIVE_USER = "RECEIVE_USER";
const LIKE_SWEET = "LIKE_SWEET";
const UNLIKE_SWEET = "UNLIKE_SWEET";

const authUser = userInfo => {
  return { type: AUTH_USER, userInfo };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

const receiveUser = userInfo => {
  return { type: RECEIVE_USER, userInfo };
};

const likeSweet = sweetId => {
  return { type: LIKE_SWEET, sweetId };
};

const unLikeSweet = sweetId => {
  return { type: UNLIKE_SWEET, sweetId };
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

export const receiveUserInfo = uid => async dispatch => {
  const userInfo = await getUser(uid);
  dispatch(receiveUser(userInfo));
};

const initialState = {
  isAuthed: false,
  userInfo: {},
  likedSweetIds: []
};

const users = (state = initialState, action) => {
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
    case RECEIVE_USER:
      return {
        ...state,
        [action.userInfo._id]: action.userInfo
      };
    case LIKE_SWEET:
      return {
        ...state,
        likedSweetIds: [...state.likedSweetIds, action.sweetId]
      };
    case UNLIKE_SWEET:
      return {
        ...state,
        likedSweetIds: state.likedSweetIds.filter(s => s !== action.sweetId)
      };
    default:
      return state;
  }
};

export default users;

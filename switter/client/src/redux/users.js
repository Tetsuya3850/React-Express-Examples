import { saveToken, removeToken, getUserInfo, parseToken } from "../helper";
import { getUser, getLikedSweetIds } from "../api";
import { LIKE_SWEET, UNLIKE_SWEET } from "./sweets";

const AUTH_USER = "AUTH_USER";
const UNAUTH_USER = "UNAUTH_USER";
const RECEIVE_LIKEDSWEETIDS = "RECEIVE_LIKEDSWEETIDS";
const RECEIVE_USER = "RECEIVE_USER";

const authUser = ownInfo => {
  return { type: AUTH_USER, ownInfo };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

const receiveLikedSweetIds = sweetIds => {
  return { type: RECEIVE_LIKEDSWEETIDS, sweetIds };
};

const receiveUser = userInfo => {
  return { type: RECEIVE_USER, userInfo };
};

export const socialAuthUser = (token, redirect) => async dispatch => {
  saveToken(token);
  dispatch(authUser(parseToken(token)));
  dispatch(handleLikedSweetIds());
  redirect();
};

export const reAuthUser = redirect => async dispatch => {
  const userInfo = getUserInfo();
  if (userInfo && userInfo.exp >= Date.now() / 1000) {
    dispatch(authUser(userInfo));
    dispatch(handleLikedSweetIds());
  } else if (userInfo && userInfo.exp < Date.now() / 1000) {
    redirect();
  }
};

export const logoutUser = redirect => async dispatch => {
  removeToken();
  dispatch(unAuthUser());
  redirect();
};

export const handleLikedSweetIds = () => async dispatch => {
  const likedSweetIds = await getLikedSweetIds();
  dispatch(receiveLikedSweetIds(likedSweetIds));
};

export const receiveUserInfo = uid => async dispatch => {
  const userInfo = await getUser(uid);
  dispatch(receiveUser(userInfo));
};

const initialState = {
  isAuthed: false,
  ownInfo: {},
  likedSweetIds: []
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        isAuthed: true,
        ownInfo: action.ownInfo
      };
    case UNAUTH_USER:
      return {
        ...state,
        isAuthed: false,
        ownInfo: {}
      };
    case RECEIVE_LIKEDSWEETIDS:
      return {
        ...state,
        likedSweetIds: action.sweetIds
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
        likedSweetIds: state.likedSweetIds.filter(sId => sId !== action.sweetId)
      };
    default:
      return state;
  }
};

export default users;

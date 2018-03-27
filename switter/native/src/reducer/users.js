import { saveToken, getToken, removeToken, getOwnInfo } from "../helper";
import axios from "axios";
import { getUser } from "../api";

const AUTH_USER = "AUTH_USER";
const UNAUTH_USER = "UNAUTH_USER";
const FETCHING_USER_SUCCESS = "FETCHING_USER_SUCCESS";

const authUser = ownInfo => {
  return { type: AUTH_USER, ownInfo };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

const fetchingUserSuccess = userInfo => {
  return { type: FETCHING_USER_SUCCESS, userInfo };
};

export const tokenAuthUser = redirect => async dispatch => {
  try {
    const userInfo = await getOwnInfo();
    const token = await getToken();
    if (userInfo && userInfo.exp >= Date.now() / 1000) {
      dispatch(authUser(userInfo));
      axios.defaults.headers.common["authorization"] = `Bearer ${token}`;
      redirect();
    }
  } catch (e) {
    console.log(e);
  }
};

export const logoutUser = redirect => async dispatch => {
  try {
    await removeToken();
    dispatch(unAuthUser());
    redirect();
  } catch (e) {
    console.log(e);
  }
};

export const handleFetchUser = uid => async dispatch => {
  try {
    const { data } = await getUser(uid);
    dispatch(fetchingUserSuccess(data));
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  isAuthed: false,
  ownInfo: {}
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
    case FETCHING_USER_SUCCESS:
      return {
        ...state,
        [action.userInfo._id]: action.userInfo
      };
    default:
      return state;
  }
};

export default users;

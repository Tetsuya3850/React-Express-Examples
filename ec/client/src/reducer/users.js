import { saveToken, removeToken, getOwnInfo, parseToken } from "../helper";
import { getHistory, addItem, editNum, deleteItem, order } from "../api";

const AUTH_USER = "AUTH_USER";
const UNAUTH_USER = "UNAUTH_USER";

const authUser = ownInfo => {
  return { type: AUTH_USER, ownInfo };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

export const socialAuthUser = (token, redirect) => dispatch => {
  saveToken(token);
  dispatch(authUser(parseToken(token)));
  redirect();
};

export const reAuthUser = redirect => dispatch => {
  const ownInfo = getOwnInfo();
  if (ownInfo && ownInfo.exp >= Date.now() / 1000) {
    dispatch(authUser(ownInfo));
  } else if (ownInfo && ownInfo.exp < Date.now() / 1000) {
    redirect();
  }
};

export const logoutUser = redirect => dispatch => {
  removeToken();
  dispatch(unAuthUser());
  redirect();
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
    default:
      return state;
  }
};

export default users;

import api from "./api";
import { saveToken, removeToken, getUserInfo, formatErrors } from "./helper";

const AUTH_USER = "AUTH_USER";
const UNAUTH_USER = "UNAUTH_USER";
const REGISTER_FAIL = "REGISTER_FAIL";
const LOGIN_FAIL = "LOGIN_FAIL";

const authUser = userInfo => {
  return {
    type: AUTH_USER,
    userInfo
  };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

const registerFail = errors => {
  return {
    type: REGISTER_FAIL,
    errors
  };
};

const loginFail = errors => {
  return {
    type: LOGIN_FAIL,
    errors
  };
};

export const registerUser = (userInfo, redirect) => async dispatch => {
  try {
    let { data } = await api.register(userInfo);
    await saveToken(data.token);
    dispatch(authUser(data.userInfo));
    redirect();
  } catch (e) {
    if (!e.response) {
      console.log(e);
      return;
    }
    let { data } = e.response;
    const formattedErrors = formatErrors(data);
    dispatch(registerFail(formattedErrors));
  }
};

export const loginUser = (userInfo, redirect) => async dispatch => {
  try {
    let { data } = await api.login(userInfo);
    await saveToken(data.token);
    dispatch(authUser(data.userInfo));
    redirect();
  } catch (e) {
    if (!e.response) {
      console.log(e);
      return;
    }
    let { data } = e.response;
    dispatch(loginFail(data));
  }
};

export const tokenAuthUser = redirect => async dispatch => {
  const userInfo = await getUserInfo();
  if (userInfo && userInfo.exp >= Date.now() / 1000) {
    dispatch(authUser(userInfo));
    redirect();
  }
};

export const logoutUser = redirect => async dispatch => {
  await removeToken();
  dispatch(unAuthUser());
  redirect();
};

const initialState = {
  isAuthed: false,
  registerErrors: {},
  loginErrors: {},
  userInfo: {}
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        isAuthed: true,
        registerErrors: {},
        loginErrors: {},
        userInfo: action.userInfo
      };
    case UNAUTH_USER:
      return initialState;
    case REGISTER_FAIL:
      return {
        ...state,
        registerErrors: action.errors
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginErrors: action.errors
      };
    default:
      return state;
  }
};

export default authReducer;

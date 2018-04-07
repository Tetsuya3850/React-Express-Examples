import { saveToken, removeToken, getOwnInfo, parseToken } from "../helper";
import {
  getHistory,
  getCart,
  postAddItem,
  postEditNum,
  postDeleteItem,
  postOrder
} from "../api";
import { normalizeItems, selectItemIds } from "../helper";
import { fetchingItemsSuccess } from "./items";

const AUTH_USER = "AUTH_USER";
const UNAUTH_USER = "UNAUTH_USER";
const FETCHING_CART_SUCCESS = "FETCHING_CART_SUCCESS";
const ADD_ITEM = "ADD_ITEM";
const EDIT_NUM = "EDIT_NUM";
const DELETE_ITEM = "DELETE_ITEM";
const ORDER = "ORDER";

const authUser = ownInfo => {
  return { type: AUTH_USER, ownInfo };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

const fetchingCartSuccess = cart => {
  return { type: FETCHING_CART_SUCCESS, cart };
};

const addItem = itemId => {
  return { type: ADD_ITEM, itemId };
};

export const socialAuthUser = (token, redirect) => dispatch => {
  saveToken(token);
  dispatch(authUser(parseToken(token)));
  redirect();
};

export const reAuthUser = redirect => async dispatch => {
  const ownInfo = getOwnInfo();
  if (ownInfo && ownInfo.exp >= Date.now() / 1000) {
    dispatch(authUser(ownInfo));
    dispatch(handleGetCart());
  } else if (ownInfo && ownInfo.exp < Date.now() / 1000) {
    redirect();
  }
};

export const logoutUser = redirect => dispatch => {
  removeToken();
  dispatch(unAuthUser());
  redirect();
};

export const handleGetCart = () => async dispatch => {
  try {
    const { data } = await getCart();
    const normalizedCartItems = normalizeItems(data.details);
    dispatch(fetchingItemsSuccess(normalizedCartItems));
    dispatch(fetchingCartSuccess(data.cart));
  } catch (e) {
    console.log(e);
  }
};

export const handleAddItem = itemId => async dispatch => {
  try {
    await postAddItem(itemId);
    dispatch(addItem(itemId));
  } catch (e) {
    console.log(e);
  }
};

const handleCart = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        [action.itemId]: 1
      };
    default:
      return state;
  }
};

const initialState = {
  isAuthed: false,
  ownInfo: {},
  cart: {}
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
    case FETCHING_CART_SUCCESS:
      return {
        ...state,
        cart: action.cart
      };
    case ADD_ITEM:
      return {
        ...state,
        cart: handleCart(state.cart, action)
      };
    default:
      return state;
  }
};

export default users;

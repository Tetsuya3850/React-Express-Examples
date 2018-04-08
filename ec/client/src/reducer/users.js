import { saveToken, removeToken, getOwnInfo, parseToken } from "../helper";
import {
  getReviewed,
  getHistory,
  getCart,
  postAddItem,
  postEditNum,
  postDeleteItem,
  postOrder
} from "../api";
import { normalizeItems, selectItemIds } from "../helper";
import { fetchingItemsSuccess, updateItemStock } from "./items";

const AUTH_USER = "AUTH_USER";
const UNAUTH_USER = "UNAUTH_USER";
const FETCHING_REVIEWED_SUCCESS = "FETCHING_REVIEWED_SUCCESS";
const FETCHING_CART_SUCCESS = "FETCHING_CART_SUCCESS";
const ORDER = "ORDER";
const FETCHING_ORDERS_SUCCESS = "FETCHING_ORDERS_SUCCESS";

const authUser = ownInfo => {
  return { type: AUTH_USER, ownInfo };
};

const unAuthUser = () => {
  return { type: UNAUTH_USER };
};

const fetchingReviewedSuccess = reviewed => {
  return { type: FETCHING_REVIEWED_SUCCESS, reviewed };
};

const fetchingCartSuccess = cart => {
  return { type: FETCHING_CART_SUCCESS, cart };
};

const order = () => {
  return { type: ORDER };
};

const fetchingOrdersSuccess = orders => {
  return { type: FETCHING_ORDERS_SUCCESS, orders };
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

export const handleGetReviewed = () => async dispatch => {
  try {
    const { data } = await getReviewed();
    dispatch(fetchingReviewedSuccess(data));
  } catch (e) {
    console.log(e);
  }
};

export const handleGetHistory = () => async dispatch => {
  try {
    const { data } = await getHistory();
    const normalizedCartItems = normalizeItems(data.details);
    dispatch(fetchingItemsSuccess(normalizedCartItems));
    dispatch(fetchingOrdersSuccess(data.orders));
  } catch (e) {
    console.log(e);
  }
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
    const { data } = await postAddItem(itemId);
    dispatch(fetchingCartSuccess(data.cart));
    dispatch(updateItemStock(itemId, data.stock));
  } catch (e) {
    console.log(e.response.data);
  }
};

export const handleEditNum = (itemId, num) => async dispatch => {
  try {
    const { data } = await postEditNum(itemId, num);
    dispatch(fetchingCartSuccess(data.cart));
    dispatch(updateItemStock(itemId, data.stock));
  } catch (e) {
    console.log(e.response.data);
  }
};

export const handleDeleteItem = itemId => async dispatch => {
  try {
    const { data } = await postDeleteItem(itemId);
    dispatch(fetchingCartSuccess(data.cart));
    dispatch(updateItemStock(itemId, data.stock));
  } catch (e) {
    console.log(e);
  }
};

export const handleOrder = redirect => async dispatch => {
  try {
    await postOrder();
    dispatch(order());
    redirect();
  } catch (e) {
    console.log(e);
  }
};

const initialState = {
  isAuthed: false,
  ownInfo: {},
  reviewedItems: [],
  cart: {},
  orders: []
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
    case FETCHING_REVIEWED_SUCCESS:
      return {
        ...state,
        reviewedItems: action.reviewed
      };
    case FETCHING_CART_SUCCESS:
      return {
        ...state,
        cart: action.cart
      };
    case ORDER:
      return {
        ...state,
        cart: {}
      };
    case FETCHING_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.orders
      };
    default:
      return state;
  }
};

export default users;

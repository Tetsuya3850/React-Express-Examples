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
import { normalizeItems } from "../helper";
import { fetchingItemsSuccess, updateItemStock } from "./items";

const AUTH_USER = "AUTH_USER";
const UNAUTH_USER = "UNAUTH_USER";
const FETCHING_REVIEWED_SUCCESS = "FETCHING_REVIEWED_SUCCESS";
const FETCHING_CART_ORDERS = "FETCHING_CART_ORDERS";
const FETCHING_CART_ORDERS_ERROR = "FETCHING_CART_ORDERS_ERROR";
const CART_ERROR = "CART_ERROR";
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

const fethingCartOrders = () => {
  return { type: FETCHING_CART_ORDERS };
};

const fethingCartOrdersError = error => {
  return { type: FETCHING_CART_ORDERS_ERROR, error };
};

const cartError = error => {
  return { type: CART_ERROR, error };
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

export const reAuthUser = () => async dispatch => {
  const ownInfo = getOwnInfo();
  if (ownInfo && ownInfo.exp >= Date.now() / 1000) {
    dispatch(authUser(ownInfo));
    dispatch(handleGetCart());
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
  dispatch(fethingCartOrders());
  try {
    const { data } = await getHistory();
    const normalizedHistoryItems = normalizeItems(data.details);
    dispatch(fetchingItemsSuccess(normalizedHistoryItems));
    dispatch(fetchingOrdersSuccess(data.orders));
  } catch (e) {
    dispatch(fethingCartOrdersError("Hmm, Something's Wrong.."));
  }
};

export const handleGetCart = () => async dispatch => {
  dispatch(fethingCartOrders());
  try {
    const { data } = await getCart();
    const normalizedCartItems = normalizeItems(data.details);
    dispatch(fetchingItemsSuccess(normalizedCartItems));
    dispatch(fetchingCartSuccess(data.cart));
  } catch (e) {
    dispatch(fethingCartOrdersError("Hmm, Something's Wrong.."));
  }
};

export const handleAddItem = (itemId, redirect) => async dispatch => {
  try {
    const { data } = await postAddItem(itemId);
    dispatch(fetchingCartSuccess(data.cart));
    dispatch(updateItemStock(itemId, data.stock));
    redirect();
  } catch (e) {
    if (!e.response) {
      console.log(e);
      return;
    }
    dispatch(cartError(e.response.data));
  }
};

export const handleEditNum = (itemId, num) => async dispatch => {
  try {
    const { data } = await postEditNum(itemId, num);
    dispatch(fetchingCartSuccess(data.cart));
    dispatch(updateItemStock(itemId, data.stock));
  } catch (e) {
    if (!e.response) {
      console.log(e);
      return;
    }
    dispatch(cartError(e.response.data));
  }
};

export const handleDeleteItem = itemId => async dispatch => {
  try {
    const { data } = await postDeleteItem(itemId);
    dispatch(fetchingCartSuccess(data.cart));
    dispatch(updateItemStock(itemId, data.stock));
  } catch (e) {
    dispatch(cartError("Hmm, Something's Wrong.."));
  }
};

export const handleOrder = redirect => async dispatch => {
  try {
    await postOrder();
    dispatch(order());
    redirect();
  } catch (e) {
    dispatch(cartError("Hmm, Something's Wrong.."));
  }
};

const initialState = {
  isAuthed: false,
  isFetching: false,
  error: "",
  cartError: "",
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
    case FETCHING_CART_ORDERS:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_CART_ORDERS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case CART_ERROR:
      return {
        ...state,
        cartError: action.error
      };
    case FETCHING_CART_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        cartError: "",
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
        isFetching: false,
        error: "",
        orders: action.orders
      };
    default:
      return state;
  }
};

export default users;

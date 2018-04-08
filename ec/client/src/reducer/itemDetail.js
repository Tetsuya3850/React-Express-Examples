import { fetchingItemsSuccess, updateItemReviews } from "./items";
import { getItem, addReview, editReview } from "../api";

const FETCHING_ITEM_DETAIL = "FETCHING_ITEM_DETAIL";
const FETCHING_ITEM_DETAIL_ERROR = "FETCHING_ITEM_DETAIL_ERROR";
const FETCHING_ITEM_DETAIL_SUCCESS = "FETCHING_ITEM_DETAIL_SUCCESS";
const ADD_REVIEW_ERROR = "ADD_REVIEW_ERROR";
const ADD_REVIEW_SUCCESS = "ADD_REVIEW_SUCCESS";

const fetchingItemDetail = () => {
  return {
    type: FETCHING_ITEM_DETAIL
  };
};

const fetchingItemDetailError = error => {
  return {
    type: FETCHING_ITEM_DETAIL_ERROR,
    error
  };
};

const fetchingItemDetailSuccess = () => {
  return {
    type: FETCHING_ITEM_DETAIL_SUCCESS
  };
};

const addReviewError = error => {
  return {
    type: ADD_REVIEW_ERROR,
    error
  };
};

const addReviewSuccess = () => {
  return {
    type: ADD_REVIEW_SUCCESS
  };
};

export const handleFetchItemDetail = itemId => async dispatch => {
  dispatch(fetchingItemDetail());
  try {
    let { data } = await getItem(itemId);
    const normalizedItem = { [data._id]: data };
    dispatch(fetchingItemsSuccess(normalizedItem));
    dispatch(fetchingItemDetailSuccess());
  } catch (e) {
    dispatch(fetchingItemDetailError("Hmm, Something's Wrong.."));
  }
};

export const handleAddReview = (itemId, review, redirect) => async dispatch => {
  try {
    let { data } = await addReview(itemId, review);
    dispatch(updateItemReviews(data));
    dispatch(addReviewSuccess());
    redirect();
  } catch (e) {
    const error_message = formatError(e);
    dispatch(addReviewError(error_message));
  }
};

export const handleEditReview = (
  itemId,
  review,
  redirect
) => async dispatch => {
  try {
    let { data } = await editReview(itemId, review);
    dispatch(updateItemReviews(data));
    dispatch(addReviewSuccess());
    redirect();
  } catch (e) {
    const error_message = formatError(e);
    dispatch(addReviewError(error_message));
  }
};

const formatError = e => {
  if (!e.response) {
    console.log(e);
    return "Network Error!";
  }
  let err = {};
  const { errors } = e.response.data;
  if (errors) {
    Object.keys(errors).forEach(key => {
      err[key] = errors[key].message;
    });
    return err;
  }
  return "Hmm, Something's Wrong..";
};

const initialState = {
  isFetching: false,
  error: "",
  reviewError: ""
};

const itemDetail = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_ITEM_DETAIL:
      return { ...state, isFetching: true };
    case FETCHING_ITEM_DETAIL_ERROR:
      return { ...state, error: action.error, isFetching: false };
    case FETCHING_ITEM_DETAIL_SUCCESS:
    case ADD_REVIEW_SUCCESS:
      return initialState;
    case ADD_REVIEW_ERROR:
      return {
        ...state,
        reviewError: action.error
      };
    default:
      return state;
  }
};

export default itemDetail;

import { fetchingSweetsSuccess, ADD_COMMENT } from "./sweets";
import { getSweetDetail } from "../api";

const FETCHING_ITEM_DETAIL = "FETCHING_SWEET_DETAIL";
const FETCHING_SWEET_DETAIL_ERROR = "FETCHING_SWEET_DETAIL_ERROR";
const FETCHING_SWEET_DETAIL_SUCCESS = "FETCHING_SWEET_DETAIL_SUCCESS";
const ADD_COMMENT_ERROR = "ADD_COMMENT_ERROR";

const fetchingSweetDetail = () => {
  return {
    type: FETCHING_SWEET_DETAIL
  };
};

const fetchingSweetDetailError = error => {
  return {
    type: FETCHING_SWEET_DETAIL_ERROR,
    error
  };
};

const fetchingSweetDetailSuccess = () => {
  return {
    type: FETCHING_SWEET_DETAIL_SUCCESS
  };
};

export const addCommentError = error => {
  return {
    type: ADD_COMMENT_ERROR,
    error
  };
};

export const handleFetchSweetDetail = sweetId => async dispatch => {
  dispatch(fetchingSweetDetail());
  try {
    let { data } = await getSweetDetail(sweetId);
    const normalizedSweet = { [sweetId]: data };
    dispatch(fetchingSweetsSuccess(normalizedSweet));
    dispatch(fetchingSweetDetailSuccess());
  } catch (e) {
    dispatch(fetchingSweetDetailError("Sorry, Please Reload!"));
  }
};

const initialState = {
  isFetching: false,
  error: ""
};

const sweetDetail = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_SWEET_DETAIL:
      return { ...state, isFetching: true };
    case FETCHING_SWEET_DETAIL_ERROR:
      return { ...state, error: action.error, isFetching: false };
    case FETCHING_SWEET_DETAIL_SUCCESS:
    case ADD_COMMENT:
      return initialState;
    case ADD_COMMENT_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default sweetDetail;

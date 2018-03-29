import { getFeedSweets } from "../api";
import { fetchingSweetsSuccess } from "./sweets";
import { normalizeSweets, selectSweetIds } from "../helper";

const FETCHING_FEED = "FETCHING_FEED";
const FETCHING_FEED_ERROR = "FETCHING_FEED_ERROR";
const FETCHING_FEED_SUCCESS = "FETCHING_FEED_SUCCESS";
const REFRESHING_FEED = "REFRESHING_FEED";
const REFRESHING_FEED_ERROR = "REFRESHING_FEED_ERROR";
const REFRESHING_FEED_SUCCESS = "REFRESHING_FEED_SUCCESS";
const ADD_FEEDIDS = "ADD_FEEDIDS";

const fetchingFeed = () => {
  return {
    type: FETCHING_FEED
  };
};

const fetchingFeedError = error => {
  return {
    type: FETCHING_FEED_ERROR,
    error
  };
};

const fetchingFeedSuccess = sweetIds => {
  return {
    type: FETCHING_FEED_SUCCESS,
    sweetIds
  };
};

const refreshingFeed = () => {
  return {
    type: REFRESHING_FEED
  };
};

const refreshingFeedError = error => {
  return {
    type: REFRESHING_FEED_ERROR,
    error
  };
};

const refreshingFeedSuccess = sweetIds => {
  return {
    type: REFRESHING_FEED_SUCCESS,
    sweetIds
  };
};

export const addFeedIds = sweetIds => {
  return {
    type: ADD_FEEDIDS,
    sweetIds
  };
};

export const handleFetchFeedSweets = () => async dispatch => {
  dispatch(fetchingFeed());
  try {
    const { data } = await getFeedSweets();
    const normalizedFeedSweets = normalizeSweets(data);
    const feedSweetIds = selectSweetIds(data);
    dispatch(fetchingSweetsSuccess(normalizedFeedSweets));
    dispatch(fetchingFeedSuccess(feedSweetIds));
  } catch (e) {
    dispatch(fetchingFeedError("Sorry, Please Reload!"));
  }
};

export const handleRefreshFeedSweets = () => async dispatch => {
  dispatch(refreshingFeed());
  try {
    let { data } = await getFeedSweets();
    const normalizedFeedSweets = normalizeSweets(data);
    const feedSweetIds = selectSweetIds(data);
    dispatch(fetchingSweetsSuccess(normalizedFeedSweets));
    dispatch(refreshingFeedSuccess(feedSweetIds));
  } catch (e) {
    dispatch(refreshingFeedError("Sorry, Please Reload!"));
  }
};

const initialState = {
  isFetching: false,
  isRefreshing: false,
  error: "",
  sweetIds: []
};

const feed = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_FEED:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_FEED_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case FETCHING_FEED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        sweetIds: action.sweetIds
      };
    case REFRESHING_FEED:
      return {
        ...state,
        isRefreshing: true
      };
    case REFRESHING_FEED_ERROR:
      return {
        ...state,
        isRefreshing: false,
        error: action.error
      };
    case REFRESHING_FEED_SUCCESS:
      return {
        ...state,
        isRefreshing: false,
        error: "",
        sweetIds: action.sweetIds
      };
    case ADD_FEEDIDS:
      return {
        ...state,
        isFetching: false,
        sweetIds: [...[action.sweetIds], ...state.sweetIds]
      };
    default:
      return state;
  }
};

export default feed;

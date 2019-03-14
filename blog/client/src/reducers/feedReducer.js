import api from "../api";
import { addArticles } from "./articleReducer";

const FETCH_FEED_REQUEST = "FETCH_FEED_REQUEST";
const FETCH_FEED_FAILURE = "FETCH_FEED_FAILURE";
const FETCH_FEED_SUCCESS = "FETCH_FEED_SUCCESS";

const fetchFeedRequest = () => ({
  type: FETCH_FEED_REQUEST
});

const fetchFeedFailure = error => ({
  type: FETCH_FEED_FAILURE,
  error: "Something Went Wrong!"
});

const fetchFeedSuccess = payload => ({
  type: FETCH_FEED_SUCCESS,
  payload
});

export const handleFetchFeed = () => async dispatch => {
  dispatch(fetchFeedRequest);
  try {
    const { data } = await api.getFeed();
    const feedIds = data.map(article => article._id);
    const normalizedArticles = {};
    data.forEach(article => {
      normalizedArticles[article._id] = { ...article };
    });
    dispatch(addArticles(normalizedArticles));
    dispatch(fetchFeedSuccess(feedIds));
  } catch (error) {
    dispatch(fetchFeedFailure(error));
  }
};

const initialState = {
  isFetching: false,
  error: "",
  feedByIds: []
};

const feed = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FEED_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_FEED_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case FETCH_FEED_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        feedByIds: action.payload
      };
    default:
      return state;
  }
};

export default feed;

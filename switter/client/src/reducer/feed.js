import { getFeedSweets } from "../api";
import { receiveSweets } from "./sweets";
import { normalizeSweets, getSweetIds } from "../helper";

const FETCHING_FEEDIDS = "FETCHING_FEEDIDS";
const RECEIVE_FEEDIDS = "RECEIVE_FEEDIDS";
const ADD_FEEDIDS = "ADD_FEEDIDS";

const fetchingFeedIds = () => {
  return {
    type: FETCHING_FEEDIDS
  };
};

const receiveFeedIds = sweetIds => {
  return {
    type: RECEIVE_FEEDIDS,
    sweetIds
  };
};

const addFeedIds = sweetIds => {
  return {
    type: ADD_FEEDIDS,
    sweetIds
  };
};

export const handleFeedSweets = () => async dispatch => {
  dispatch(fetchingFeedIds());
  const { data } = await getFeedSweets();
  const normalizedFeedSweets = normalizeSweets(data);
  const feedSweetIds = getSweetIds(data);
  dispatch(receiveSweets(normalizedFeedSweets));
  dispatch(receiveFeedIds(feedSweetIds));
};

const initialState = {
  isFetching: false,
  sweetIds: []
};

const feed = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_FEEDIDS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_FEEDIDS:
      return {
        isFetching: false,
        sweetIds: action.sweetIds
      };
    case ADD_FEEDIDS:
      return {
        isFetching: false,
        sweetIds: [...action.sweetIds, ...state.sweetIds]
      };
    default:
      return state;
  }
};

export default feed;

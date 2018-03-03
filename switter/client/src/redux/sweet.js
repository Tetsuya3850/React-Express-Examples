import { addOwnSweet } from "./user";
import { getFeed, postNewSweet } from "../api";

export const RECEIVE_FEED = "RECEIVE_FEED";
export const ADD_SWEET = "ADD_SWEET";

const receiveFeed = sweets => {
  return {
    type: RECEIVE_FEED,
    sweets
  };
};

const addSweet = sweet => {
  return {
    type: ADD_SWEET,
    sweet
  };
};

export const receiveFeedThunk = () => async dispatch => {
  const sweets = await getFeed();
  dispatch(receiveFeed(sweets));
};

export const addSweetThunk = (sweet, uid) => async dispatch => {
  const new_sweet = await postNewSweet(sweet, uid);
  dispatch(addSweet(new_sweet));
  dispatch(addOwnSweet(new_sweet));
};

const initialState = {
  feed: []
};

const sweet = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_FEED:
      return {
        feed: action.sweets
      };
    case ADD_SWEET:
      return {
        feed: [...state.feed, action.sweet]
      };
    default:
      return state;
  }
};

export default sweet;

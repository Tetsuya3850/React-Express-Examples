import { postLikeSweet, postUnlikeSweet } from "../api";

const RECEIVE_SWEETS = "RECEIVE_SWEETS";
export const LIKE_SWEET = "LIKE_SWEET";
export const UNLIKE_SWEET = "UNLIKE_SWEET";

export const receiveSweets = sweets => {
  return {
    type: RECEIVE_SWEETS,
    sweets
  };
};

export const likeSweet = sweetId => {
  return {
    type: LIKE_SWEET,
    sweetId
  };
};

export const unlikeSweet = sweetId => {
  return {
    type: UNLIKE_SWEET,
    sweetId
  };
};

export const handleLikeSweet = sweetId => async dispatch => {
  const reponse = await postLikeSweet(sweetId);
  dispatch(likeSweet(sweetId));
};

export const handleUnlikeSweet = sweetId => async dispatch => {
  const reponse = await postUnlikeSweet(sweetId);
  dispatch(unlikeSweet(sweetId));
};

const likeReducer = (state, action) => {
  switch (action.type) {
    case LIKE_SWEET:
      return {
        ...state,
        like: state.like + 1
      };
    case UNLIKE_SWEET:
      return {
        ...state,
        like: state.like - 1
      };
    default:
      return state;
  }
};

const initialState = {};

const sweets = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_SWEETS:
      return { ...state, ...action.sweets };
    case LIKE_SWEET:
    case UNLIKE_SWEET:
      return {
        ...state,
        [action.sweetId]: likeReducer(state[action.sweetId], action)
      };
    default:
      return state;
  }
};

export default sweets;

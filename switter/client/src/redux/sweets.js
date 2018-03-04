import {
  postNewSweet,
  postLikeSweet,
  postUnlikeSweet,
  postComment,
  getSweet
} from "../api";

import { addFeedIds } from "./feed";

const FETCHING_SWEET = "FETCHING_SWEET";
const RECEIVE_SWEETS = "RECEIVE_SWEETS";
export const LIKE_SWEET = "LIKE_SWEET";
export const UNLIKE_SWEET = "UNLIKE_SWEET";
const ADD_COMMENT = "ADD_COMMENT";

const fetchingSweet = () => {
  return {
    type: FETCHING_SWEET
  };
};

export const receiveSweets = sweets => {
  return {
    type: RECEIVE_SWEETS,
    sweets
  };
};

const likeSweet = sweetId => {
  return {
    type: LIKE_SWEET,
    sweetId
  };
};

const unlikeSweet = sweetId => {
  return {
    type: UNLIKE_SWEET,
    sweetId
  };
};

const addComment = (sweetId, comment) => {
  return {
    type: ADD_COMMENT,
    sweetId,
    comment
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
        likes: state.likes + 1
      };
    case UNLIKE_SWEET:
      return {
        ...state,
        likes: state.likes - 1
      };
    default:
      return state;
  }
};

export const handleReceiveSweet = sweetId => async dispatch => {
  dispatch(fetchingSweet());
  const sweet = await getSweet(sweetId);
  const normalizedSweet = { [sweetId]: sweet };
  dispatch(receiveSweets(normalizedSweet));
};

export const handleAddSweet = payload => async dispatch => {
  const addedSweet = await postNewSweet(payload);
  const normalizedAddedSweet = { [addedSweet._id]: addedSweet };
  dispatch(receiveSweets(normalizedAddedSweet));
  dispatch(addFeedIds([addedSweet._id]));
};

export const handleAddComment = (sweetId, comment) => async dispatch => {
  const commentWithId = await postComment({ sweetId, comment });
  dispatch(addComment(sweetId, commentWithId));
};

const commentReducer = (state, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.comment]
      };
    default:
      return state;
  }
};

const initialState = {
  isFetching: false
};

const sweets = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_SWEET:
      return { ...state, isFetching: true };
    case RECEIVE_SWEETS:
      return { ...state, ...action.sweets, isFetching: false };
    case LIKE_SWEET:
    case UNLIKE_SWEET:
      return {
        ...state,
        [action.sweetId]: likeReducer(state[action.sweetId], action)
      };
    case ADD_COMMENT:
      return {
        ...state,
        [action.sweetId]: commentReducer(state[action.sweetId], action)
      };
    default:
      return state;
  }
};

export default sweets;

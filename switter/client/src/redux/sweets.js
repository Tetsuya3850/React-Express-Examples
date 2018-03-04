import { postToggleSweet, postComment, getSweet } from "../api";

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

const likeSweet = (sweetId, uid) => {
  return {
    type: LIKE_SWEET,
    sweetId,
    uid
  };
};

const unlikeSweet = (sweetId, uid) => {
  return {
    type: UNLIKE_SWEET,
    sweetId,
    uid
  };
};

const addComment = (sweetId, comment) => {
  return {
    type: ADD_COMMENT,
    sweetId,
    comment
  };
};

export const handleReceiveSweet = sweetId => async dispatch => {
  dispatch(fetchingSweet());
  const sweet = await getSweet(sweetId);
  const normalizedSweet = { [sweetId]: sweet };
  dispatch(receiveSweets(normalizedSweet));
};

export const handleLikeSweet = (sweetId, uid) => async dispatch => {
  const reponse = await postToggleSweet(sweetId);
  dispatch(likeSweet(sweetId, uid));
};

export const handleUnlikeSweet = (sweetId, uid) => async dispatch => {
  const reponse = await postToggleSweet(sweetId);
  dispatch(unlikeSweet(sweetId, uid));
};

export const handleAddComment = (sweetId, comment) => async dispatch => {
  const commentWithId = await postComment({ sweetId, comment });
  dispatch(addComment(sweetId, commentWithId));
};

const likeCommentReducer = (state, action) => {
  switch (action.type) {
    case LIKE_SWEET:
      return {
        ...state,
        likedByIds: [...state.likedByIds, ...[action.uid]]
      };
    case UNLIKE_SWEET:
      return {
        ...state,
        likedByIds: state.likedByIds.filter(uid => uid !== action.uid)
      };
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
    case ADD_COMMENT:
      return {
        ...state,
        [action.sweetId]: likeCommentReducer(state[action.sweetId], action)
      };
    default:
      return state;
  }
};

export default sweets;

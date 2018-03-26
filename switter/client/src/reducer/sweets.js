import { getSweet, postToggleSweet, postComment } from "../api";

const FETCHING_SWEET = "FETCHING_SWEET";
const FETCHING_SWEET_ERROR = "FETCHING_SWEET_ERROR";
const FETCHING_SWEETS_SUCCESS = "FETCHING_SWEETS_SUCCESS";
const LIKE_SWEET = "LIKE_SWEET";
const UNLIKE_SWEET = "UNLIKE_SWEET";
const ADD_COMMENT = "ADD_COMMENT";

const fetchingSweet = () => {
  return {
    type: FETCHING_SWEET
  };
};

const fetchingSweetError = () => {
  return {
    type: FETCHING_SWEET_ERROR
  };
};

export const fetchingSweetsSuccess = sweets => {
  return {
    type: FETCHING_SWEETS_SUCCESS,
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

export const handleFetchSweet = sweetId => async dispatch => {
  dispatch(fetchingSweet());
  try {
    let { data } = await getSweet(sweetId);
    const normalizedSweet = { [sweetId]: data };
    dispatch(fetchingSweetsSuccess(normalizedSweet));
  } catch (e) {
    let { data } = e.response;
    dispatch(fetchingSweetError(data));
  }
};

export const handleLikeSweet = (sweetId, uid) => async dispatch => {
  try {
    await postToggleSweet(sweetId);
    dispatch(likeSweet(sweetId, uid));
  } catch (e) {
    console.log(e);
  }
};

export const handleUnlikeSweet = (sweetId, uid) => async dispatch => {
  try {
    await postToggleSweet(sweetId);
    dispatch(unlikeSweet(sweetId, uid));
  } catch (e) {
    console.log(e);
  }
};

export const handleAddComment = (sweetId, comment) => async dispatch => {
  try {
    const { data } = await postComment(sweetId, comment);
    dispatch(addComment(sweetId, data));
  } catch (e) {
    console.log(e);
  }
};

const likeCommentReducer = (state, action) => {
  switch (action.type) {
    case LIKE_SWEET:
      return {
        ...state,
        likedUserIds: [...state.likedUserIds, ...[action.uid]]
      };
    case UNLIKE_SWEET:
      return {
        ...state,
        likedUserIds: state.likedUserIds.filter(uid => uid !== action.uid)
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
  isFetching: false,
  error: ""
};

const sweets = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_SWEET:
      return { ...state, isFetching: true };
    case FETCHING_SWEET_ERROR:
      return { ...state, error: action.error, isFetching: false };
    case FETCHING_SWEETS_SUCCESS:
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

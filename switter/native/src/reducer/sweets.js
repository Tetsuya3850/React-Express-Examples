import { postSweet, postToggleSweet, postComment } from "../api";
import { addCommentError } from "./sweetDetail";
import { addFeedIds } from "./feed";

const FETCHING_SWEETS_SUCCESS = "FETCHING_SWEETS_SUCCESS";
const ADD_SWEET_ERROR = "ADD_SWEET_ERROR";
const LIKE_SWEET = "LIKE_SWEET";
const UNLIKE_SWEET = "UNLIKE_SWEET";
export const ADD_COMMENT = "ADD_COMMENT";

export const fetchingSweetsSuccess = sweets => {
  return {
    type: FETCHING_SWEETS_SUCCESS,
    sweets
  };
};

export const addSweetError = error => {
  return {
    type: ADD_SWEET_ERROR,
    error
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

export const handleAddSweet = (sweet, clear) => async dispatch => {
  try {
    let { data } = await postSweet(sweet);
    const normalizedSweet = { [data._id]: data };
    dispatch(fetchingSweetsSuccess(normalizedSweet));
    dispatch(addFeedIds(data._id));
    clear();
  } catch (e) {
    const error_message = formatError(e);
    dispatch(addSweetError(error_message));
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

export const handleAddComment = (sweetId, comment, clear) => async dispatch => {
  try {
    const { data } = await postComment(sweetId, comment);
    dispatch(addComment(sweetId, data));
    clear();
  } catch (e) {
    const error_message = formatError(e);
    dispatch(addCommentError(error_message));
  }
};

const formatError = e => {
  if (!e.response) {
    console.log(e);
    return "Network Error!";
  }
  if (e.response.data.errors.text) {
    return e.response.data.errors.text.message;
  } else if (e.response.data.errors["comments.4.text"]) {
    return e.response.data.errors["comments.4.text"].message;
  }
  return "Something went wrong!";
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
  error: ""
};

const sweets = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_SWEETS_SUCCESS:
      return { ...state, ...action.sweets, error: "" };
    case ADD_SWEET_ERROR:
      return { ...state, error: action.error };
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

import { getUserSweets } from "../api";
import { fetchingSweetsSuccess } from "./sweets";
import { normalizeSweets, selectSweetIds } from "../helper";

const FETCHING_USER_SWEETS = "FETCHING_USER_SWEETS";
const FETCHING_USER_SWEETS_ERROR = "FETCHING_USER_SWEETS_ERROR";
const FETCHING_USER_SWEETS_SUCCESS = "FETCHING_USER_SWEETS_SUCCESS";

const fetchingUserSweets = () => {
  return {
    type: FETCHING_USER_SWEETS
  };
};

const fetchingUserSweetsError = error => {
  return {
    type: FETCHING_USER_SWEETS_ERROR,
    error
  };
};

const fetchingUserSweetsSuccess = (uid, sweetIds) => {
  return {
    type: FETCHING_USER_SWEETS_SUCCESS,
    uid,
    sweetIds
  };
};

export const handleFetchUserSweets = uid => async dispatch => {
  dispatch(fetchingUserSweets());
  try {
    const { data } = await getUserSweets(uid);
    const normalizedUserSweets = normalizeSweets(data);
    const userSweetIds = selectSweetIds(data);
    dispatch(fetchingSweetsSuccess(normalizedUserSweets));
    dispatch(fetchingUserSweetsSuccess(uid, userSweetIds));
  } catch (e) {
    dispatch(fetchingUserSweetsError("Sorry, Please Reload!"));
  }
};

const initialState = {
  isFetching: false,
  error: ""
};

const userSweets = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_USER_SWEETS:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_USER_SWEETS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case FETCHING_USER_SWEETS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        [action.uid]: action.sweetIds
      };
    default:
      return state;
  }
};

export default userSweets;

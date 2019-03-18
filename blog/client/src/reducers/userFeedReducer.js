import * as api from "../api";
import { addArticles } from "./articlesReducer";
import { addUsers } from "./usersReducer";
import { normalize } from "normalizr";
import { article } from "./schema";

const FETCH_USERFEED_REQUEST = "FETCH_USERFEED_REQUEST";
const FETCH_USERFEED_FAILURE = "FETCH_USERFEED_FAILURE";
const FETCH_USERFEED_SUCCESS = "FETCH_USERFEED_SUCCESS";

const fetchUserFeedRequest = () => ({
  type: FETCH_USERFEED_REQUEST
});

const fetchUserFeedFailure = error => ({
  type: FETCH_USERFEED_FAILURE,
  error: "Something Went Wrong!"
});

const fetchUserFeedSuccess = (userId, data) => ({
  type: FETCH_USERFEED_SUCCESS,
  userId,
  data
});

export const handleFetchUserFeed = userId => async (dispatch, getState) => {
  const { userFeed } = getState();
  if (userFeed.isFetching) {
    return;
  }
  dispatch(fetchUserFeedRequest());
  try {
    const response = await api.getUser(userId);
    const normalizedUser = { [response.data._id]: response.data };
    dispatch(addUsers(normalizedUser));

    const { data } = await api.getUserFeed(userId);
    const normalizedData = normalize(data, [article]);
    dispatch(addArticles(normalizedData.entities.articles));
    dispatch(addUsers(normalizedData.entities.users));

    dispatch(fetchUserFeedSuccess(userId, normalizedData.result));
  } catch (error) {
    console.log(error);
    dispatch(fetchUserFeedFailure(error));
  }
};

const initialState = {
  isFetching: false,
  error: "",
  userFeedByIds: {}
};

const userFeed = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERFEED_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_USERFEED_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case FETCH_USERFEED_SUCCESS:
      return {
        isFetching: false,
        error: "",
        userFeedByIds: {
          ...state.userFeedByIds,
          [action.userId]: action.data
        }
      };
    default:
      return state;
  }
};

export default userFeed;

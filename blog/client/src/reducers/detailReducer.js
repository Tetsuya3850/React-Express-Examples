import * as api from "../api";
import { addArticles } from "./articlesReducer";
import { addUsers } from "./usersReducer";
import { normalize } from "normalizr";
import { article } from "./schema";

const FETCH_DETAIL_REQUEST = "FETCH_DETAIL_REQUEST";
const FETCH_DETAIL_FAILURE = "FETCH_DETAIL_FAILURE";
const FETCH_DETAIL_SUCCESS = "FETCH_DETAIL_SUCCESS";

const fetchDetailRequest = () => ({
  type: FETCH_DETAIL_REQUEST
});

const fetchDetailFailure = error => ({
  type: FETCH_DETAIL_FAILURE,
  error: "Something Went Wrong!"
});

const fetchDetailSuccess = () => ({
  type: FETCH_DETAIL_SUCCESS
});

export const handleGetArticle = _id => async dispatch => {
  dispatch(fetchDetailRequest());
  try {
    const { data } = await api.getArticle(_id);
    const normalizedData = normalize(data, article);
    dispatch(addArticles(normalizedData.entities.articles));
    dispatch(addUsers(normalizedData.entities.users));
    dispatch(fetchDetailSuccess());
  } catch (error) {
    dispatch(fetchDetailFailure(error));
  }
};

const initialState = {
  isFetching: false,
  error: ""
};

const detail = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DETAIL_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_DETAIL_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case FETCH_DETAIL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: ""
      };
    default:
      return state;
  }
};

export default detail;

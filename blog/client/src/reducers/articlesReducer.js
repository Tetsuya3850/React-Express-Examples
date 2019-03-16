import { normalize } from "normalizr";
import { article } from "./schema";
import api from "../api";
import { addUsers } from "./usersReducer";

const ADD_ARTICLES = "ADD_ARTICLES";

export const addArticles = articles => ({
  type: ADD_ARTICLES,
  articles
});

export const handleGetArticle = _id => async dispatch => {
  const { data } = await api.getArticle(_id);
  const normalizedData = normalize(data, article);
  dispatch(addArticles(normalizedData.entities.articles));
  dispatch(addUsers(normalizedData.entities.users));
};

export const handleGetArticlesByUser = _id => async dispatch => {
  const { data } = await api.getArticlesByUser(_id);
  const normalizedData = normalize(data, [article]);
  dispatch(addArticles(normalizedData.entities.articles));
  dispatch(addUsers(normalizedData.entities.users));
};

const initialState = {};

const articles = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ARTICLES:
      return { ...state, ...action.articles };
    default:
      return state;
  }
};

export default articles;

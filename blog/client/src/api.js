import axios from "axios";
import { getToken } from "./tokenUtils";

const SERVER_URL = "http://localhost:3001";
axios.defaults.baseURL = SERVER_URL;

const setAuthHeader = () => ({
  headers: { authorization: `Bearer ${getToken()}` }
});

export const signup = payload => axios.post(`/users/signup`, payload);
export const signin = payload => axios.post(`/users/signin`, payload);
export const getUser = userId => axios.get(`/users/${userId}`, setAuthHeader());

export const addArticle = payload =>
  axios.post(`/articles`, payload, setAuthHeader());
export const getFeed = () => axios.get(`/articles`, setAuthHeader());
export const getArticle = articleId =>
  axios.get(`/articles/${articleId}`, setAuthHeader());
export const getUserFeed = userId =>
  axios.get(`/articles/users/${userId}`, setAuthHeader());
export const editArticle = payload =>
  axios.put(`/articles/${payload._id}`, payload, setAuthHeader());
export const deleteArticle = articleId =>
  axios.delete(`/articles/${articleId}`, setAuthHeader());

import axios from "axios";
import { getToken } from "./tokenUtils";

const SERVER_URL = "http://localhost:3001";
axios.defaults.baseURL = SERVER_URL;

const getAuthHeader = () => ({
  headers: { authorization: `Bearer ${getToken()}` }
});

export const signup = payload => axios.post(`/users/signup`, payload);
export const signin = payload => axios.post(`/users/signin`, payload);
export const addArticle = payload =>
  axios.post(`/articles`, payload, getAuthHeader());
export const getFeed = () => axios.get(`/articles`, getAuthHeader());
export const getArticle = _id => axios.get(`/articles/${_id}`, getAuthHeader());
export const getUserFeed = _id =>
  axios.get(`/articles/users/${_id}`, getAuthHeader());
export const editArticle = payload =>
  axios.put(`/articles/${payload._id}`, payload, getAuthHeader());
export const deleteArticle = _id =>
  axios.delete(`/articles/${_id}`, getAuthHeader());

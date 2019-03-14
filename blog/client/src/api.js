import axios from "axios";
import { getToken } from "./tokenUtils";

const SERVER_URL = "http://localhost:3001";

const signup = payload => axios.post(`${SERVER_URL}/users/signup`, payload);
const signin = payload => axios.post(`${SERVER_URL}/users/signin`, payload);
const addArticle = payload =>
  axios.post(`${SERVER_URL}/articles`, payload, {
    headers: { authorization: `Bearer ${getToken()}` }
  });
const getFeed = () =>
  axios.get(`${SERVER_URL}/articles`, {
    headers: { authorization: `Bearer ${getToken()}` }
  });

const api = {
  signup,
  signin,
  addArticle,
  getFeed
};
export default api;

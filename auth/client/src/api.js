import axios from "axios";
import { getToken } from "./helper";

const SERVER_URL = "https://auth-server-3850.herokuapp.com";

const register = userInfo => axios.post(`${SERVER_URL}/register`, userInfo);
const login = userInfo => axios.post(`${SERVER_URL}/login`, userInfo);
const getSecret = uid =>
  axios.get(`${SERVER_URL}/secret/${uid}`, {
    headers: { authorization: `Bearer ${getToken()}` }
  });

const api = {
  register,
  login,
  getSecret
};
export default api;

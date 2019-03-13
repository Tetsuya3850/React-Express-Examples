import axios from "axios";
import { getToken } from "./tokenUtils";

const SERVER_URL = "https://auth-server-3850.herokuapp.com";

const signup = payload => axios.post(`${SERVER_URL}/signup`, payload);
const signin = payload => axios.post(`${SERVER_URL}/signin`, payload);
const getUser = async () =>
  axios.get(`${SERVER_URL}/users`, {
    headers: { authorization: `Bearer ${await getToken()}` }
  });

const api = {
  signup,
  signin,
  getUser
};
export default api;

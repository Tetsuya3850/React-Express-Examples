import axios from "axios";
import { getToken } from "./tokenUtils";

const SERVER_URL = "http://localhost:3001";

const signup = payload => axios.post(`${SERVER_URL}/users/signup`, payload);
const signin = payload => axios.post(`${SERVER_URL}/users/signin`, payload);

const api = {
  signup,
  signin
};
export default api;

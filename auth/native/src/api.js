import axios from "axios";
import { getToken } from "./utils";

const SERVER_URL = "https://logsignserver.herokuapp.com";

const register = userInfo => axios.post(`${SERVER_URL}/register`, userInfo);
const login = userInfo => axios.post(`${SERVER_URL}/login`, userInfo);
const getSecret = async uid => {
  const token = await getToken();
  return axios.get(
    `${SERVER_URL}/secret/${uid}`,
    {
      headers: { authorization: `Bearer ${token}` }
    },
    uid
  );
};

const api = {
  register,
  login,
  getSecret
};
export default api;

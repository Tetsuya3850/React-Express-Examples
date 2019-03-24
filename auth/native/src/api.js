import axios from "axios";
import { getToken } from "./tokenUtils";

const SERVER_URL = "https://auth-server-3850.herokuapp.com";
axios.defaults.baseURL = SERVER_URL;

const setAuthHeader = () => ({
  headers: { authorization: `Bearer ${getToken()}` }
});

export const signup = payload => axios.post(`/signup`, payload);
export const signin = payload => axios.post(`/signin`, payload);
export const getUser = userId => axios.get(`/users/${userId}`, setAuthHeader());

import axios from "axios";
import { getToken } from "./tokenUtils";

const SERVER_URL = "https://auth-server-3850.herokuapp.com";
axios.defaults.baseURL = SERVER_URL;

export const setAuthHeader = async () => ({
  headers: { authorization: `Bearer ${await getToken()}` }
});

export const signup = payload => axios.post(`/signup`, payload);
export const signin = payload => axios.post(`/signin`, payload);

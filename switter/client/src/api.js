import axios from "axios";
const SERVER_URL = "https://switter-server-3850.herokuapp.com";

export const getFeedSweets = () => axios.get(`${SERVER_URL}/sweets/feed`);
export const getUser = uid => axios.get(`${SERVER_URL}/users/${uid}`);
export const getUserSweets = uid =>
  axios.get(`${SERVER_URL}/sweets/users/${uid}`);
export const getSweetDetail = sweetId =>
  axios.get(`${SERVER_URL}/sweets/detail/${sweetId}`);
export const postSweet = new_sweet =>
  axios.post(`${SERVER_URL}/sweets/add/`, new_sweet);
export const postToggleSweet = sweetId =>
  axios.post(`${SERVER_URL}/sweets/togglelike/${sweetId}`);
export const postComment = (sweetId, comment) =>
  axios.post(`${SERVER_URL}/sweets/comment/${sweetId}`, comment);

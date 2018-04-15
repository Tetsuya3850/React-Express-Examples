import axios from "axios";
import { getToken } from "./helper";
const SERVER_URL = "https://ec-server-3850.herokuapp.com";
axios.defaults.headers.common["authorization"] = `Bearer ${getToken()}`;

export const getReviewed = () => axios.get(`${SERVER_URL}/users/reviewed`);
export const getHistory = () => axios.get(`${SERVER_URL}/users/history`);
export const getCart = () => axios.get(`${SERVER_URL}/users/cart`);
export const postAddItem = itemId =>
  axios.post(`${SERVER_URL}/users/additem`, { itemId });
export const postEditNum = (itemId, num) =>
  axios.post(`${SERVER_URL}/users/editnum`, { itemId, num });
export const postDeleteItem = itemId =>
  axios.post(`${SERVER_URL}/users/deleteitem`, { itemId });
export const postOrder = () => axios.post(`${SERVER_URL}/users/order`);

export const getAll = () => axios.get(`${SERVER_URL}/items/all`);
export const getCategory = key =>
  axios.get(`${SERVER_URL}/items/category/${key}`);
export const getSearch = query =>
  axios.get(`${SERVER_URL}/items/search/${query}`);
export const getItem = itemid =>
  axios.get(`${SERVER_URL}/items/details/${itemid}`);
export const addReview = (itemId, review) =>
  axios.post(`${SERVER_URL}/items/${itemId}/addreview`, review);
export const editReview = (itemId, review) =>
  axios.post(`${SERVER_URL}/items/${itemId}/editreview`, review);

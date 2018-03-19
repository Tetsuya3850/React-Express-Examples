import axios from "axios";

const SERVER_URL = "http://localhost:5150";
const addResponse = new_response =>
  axios.post(`${SERVER_URL}/add`, new_response);

const api = {
  addResponse
};
export default api;

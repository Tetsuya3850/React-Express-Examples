import axios from "axios";

const SERVER_URL = "https://questionnaire-server-3850.herokuapp.com";
const addResponse = new_response =>
  axios.post(`${SERVER_URL}/add`, new_response);

const api = {
  addResponse
};
export default api;

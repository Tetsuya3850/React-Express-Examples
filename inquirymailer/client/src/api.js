import axios from "axios";

const SERVER_URL = "http://localhost:5150";
const sendInquiry = new_inquiry =>
  axios.post(`${SERVER_URL}/inquiry`, new_inquiry);

const api = {
  sendInquiry
};
export default api;

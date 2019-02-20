import axios from "axios";

const SERVER_URL = "https://todo-server-3850.herokuapp.com";
const fetchTodos = () => axios.get(`${SERVER_URL}/todos`);
const addTodo = new_todo => axios.post(`${SERVER_URL}/todos`, new_todo);
const deleteTodo = _id => axios.delete(`${SERVER_URL}/todos/${_id}`);

const api = { fetchTodos, addTodo, deleteTodo };
export default api;

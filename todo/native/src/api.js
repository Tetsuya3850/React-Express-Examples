import axios from "axios";

const SERVER_URL = "https://todo-server-3850.herokuapp.com";
const fetchTodos = () => axios.get(`${SERVER_URL}/todo`);
const addTodo = new_todo => axios.post(`${SERVER_URL}/add`, new_todo);
const toggleTodo = _id => axios.post(`${SERVER_URL}/toggle`, { _id });
const deleteTodo = _id => axios.post(`${SERVER_URL}/delete`, { _id });

const api = { fetchTodos, addTodo, toggleTodo, deleteTodo };
export default api;

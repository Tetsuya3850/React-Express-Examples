import axios from "axios";

const SERVER_URL = "https://todo-server-3850.herokuapp.com";
axios.defaults.baseURL = SERVER_URL;

export const fetchTodos = () => axios.get(`/todos`);
export const addTodo = new_todo => axios.post(`/todos`, new_todo);
export const deleteTodo = _id => axios.delete(`/todos/${_id}`);

import v4 from "uuid";
import api from "./api";

export const RECEIVE_TODOS = "RECEIVE_TODOS";
export const ADD_NEW_TODO = "ADD_NEW_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

const receiveTodos = () => async dispatch => {
  const todos = await api.receiveTodos();
  dispatch({ type: RECEIVE_TODOS, todos });
};

const addNewTodo = task => async dispatch => {
  const newTodo = {
    task,
    _id: v4(),
    done: false
  };
  await api.addNewTodo(newTodo);
  dispatch({ type: ADD_NEW_TODO, todos: newTodo });
};

const toggleTodo = _id => async dispatch => {
  await api.toggleTodo(_id);
  dispatch({ type: TOGGLE_TODO, _id });
};

const actions = {
  receiveTodos,
  addNewTodo,
  toggleTodo
};
export default actions;

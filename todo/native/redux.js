import v4 from "uuid";
import api from "./api";

const FETCHING_TODOS = "FETCHING_TODOS";
const RECEIVE_TODOS = "RECEIVE_TODOS";
const ADD_NEW_TODO = "ADD_NEW_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";

export const receiveTodos = () => async dispatch => {
  dispatch({ type: FETCHING_TODOS });
  const todos = await api.receiveTodos();
  dispatch({ type: RECEIVE_TODOS, todos });
};

export const addNewTodo = task => async dispatch => {
  const newTodo = {
    task,
    _id: v4(),
    done: false
  };
  await api.addNewTodo(newTodo);
  dispatch({ type: ADD_NEW_TODO, todos: newTodo });
};

export const toggleTodo = _id => async dispatch => {
  await api.toggleTodo(_id);
  dispatch({ type: TOGGLE_TODO, _id });
};

export const deleteTodo = _id => async dispatch => {
  await api.deleteTodo(_id);
  dispatch({ type: DELETE_TODO, _id });
};

const initialState = {
  isFetching: false,
  todos: []
};

const todoAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_TODOS:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_TODOS:
      return {
        isFetching: false,
        todos: action.todos
      };
    case ADD_NEW_TODO:
      return {
        ...state,
        todos: [...[action.todos], ...state.todos]
      };
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo._id === action._id) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        })
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(t => t._id !== action._id)
      };
    default:
      return state;
  }
};

export default todoAppReducer;

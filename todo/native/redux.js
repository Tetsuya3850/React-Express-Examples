import v4 from "uuid";
import api from "./api";

const FETCHING_TODOS = "FETCHING_TODOS";
const FETCHING_TODOS_ERROR = "FETCHING_TODOS_ERROR";
const FETCHING_TODOS_SUCCESS = "FETCHING_TODOS_SUCCESS";
const REFRESHING_TODOS = "REFRESHING_TODOS";
const REFRESHING_TODOS_ERROR = "REFRESHING_TODOS_ERROR";
const REFRESHING_TODOS_SUCCESS = "REFRESHING_TODOS_SUCCESS";
const ADD_NEW_TODO = "ADD_NEW_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";

export const handleFetchTodos = () => async dispatch => {
  dispatch({ type: FETCHING_TODOS });
  const response = await api.fetchTodos();
  if (response.error === undefined) {
    dispatch({ type: FETCHING_TODOS_SUCCESS, todos: response });
  } else {
    dispatch({ type: FETCHING_TODOS_ERROR, error: response.error });
  }
};

export const refreshTodos = () => async dispatch => {
  dispatch({ type: REFRESHING_TODOS });
  const response = await api.fetchTodos();
  if (response.error === undefined) {
    dispatch({ type: REFRESHING_TODOS_SUCCESS, todos: response });
  } else {
    dispatch({ type: REFRESHING_TODOS_ERROR, error: response.error });
  }
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
  refreshing: false,
  error: "",
  todos: []
};

const todoAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_TODOS:
      return {
        ...state,
        isFetching: true
      };
    case FETCHING_TODOS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case FETCHING_TODOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        todos: action.todos
      };
    case REFRESHING_TODOS:
      return {
        ...state,
        refreshing: true
      };
    case REFRESHING_TODOS_ERROR:
      return {
        ...state,
        refreshing: false,
        error: action.error
      };
    case REFRESHING_TODOS_SUCCESS:
      return {
        ...state,
        refreshing: false,
        error: "",
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

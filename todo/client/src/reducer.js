import v4 from "uuid";
import api from "./api";

const FETCHING_TODOS = "FETCHING_TODOS";
const FETCHING_TODOS_ERROR = "FETCHING_TODOS_ERROR";
const FETCHING_TODOS_SUCCESS = "FETCHING_TODOS_SUCCESS";
const ADD_TODO = "ADD_TODO";
const TOGGLE_TODO = "TOGGLE_TODO";
const DELETE_TODO = "DELETE_TODO";
const TODO_ACTION_FAILURE = "TODO_ACTION_FAILURE";

export const handleFetchTodos = () => async dispatch => {
  dispatch({ type: FETCHING_TODOS });
  try {
    const { data } = await api.fetchTodos();
    dispatch({ type: FETCHING_TODOS_SUCCESS, todos: data });
  } catch (e) {
    dispatch({ type: FETCHING_TODOS_ERROR, error: e.message });
  }
};

export const addTodo = (task, clearInput) => async dispatch => {
  const newTodo = {
    task,
    _id: v4(),
    done: false,
    created: Date.now()
  };
  try {
    await api.addTodo(newTodo);
    dispatch({ type: ADD_TODO, todo: newTodo });
    clearInput();
  } catch (e) {
    dispatch({ type: TODO_ACTION_FAILURE, error: e.message });
  }
};

export const toggleTodo = _id => async dispatch => {
  try {
    await api.toggleTodo(_id);
    dispatch({ type: TOGGLE_TODO, _id });
  } catch (e) {
    dispatch({ type: TODO_ACTION_FAILURE, error: e.message });
  }
};

export const deleteTodo = _id => async dispatch => {
  try {
    await api.deleteTodo(_id);
    dispatch({ type: DELETE_TODO, _id });
  } catch (e) {
    dispatch({ type: TODO_ACTION_FAILURE, error: e.message });
  }
};

const initialState = {
  isFetching: false,
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
    case ADD_TODO:
      return {
        ...state,
        todos: [...[action.todo], ...state.todos]
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
    case TODO_ACTION_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default todoAppReducer;

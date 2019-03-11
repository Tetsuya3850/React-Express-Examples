import api from "./api";

const FETCH_TODOS = "FETCH_TODOS";
const FETCH_TODOS_ERROR = "FETCH_TODOS_ERROR";
const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
const ADD_TODO = "ADD_TODO";
const ADD_TODO_ERROR = "ADD_TODO_ERROR";
const DELETE_TODO = "DELETE_TODO";
const DELETE_TODO_ERROR = "DELETE_TODO_ERROR";

export const fetchTodos = () => ({
  type: FETCH_TODOS
});

export const fetchTodosSuccess = data => ({
  type: FETCH_TODOS_SUCCESS,
  payload: data
});

export const fetchTodosError = error => ({
  type: FETCH_TODOS_ERROR,
  error: "Something went wrong!"
});

export const addTodo = new_todo => ({
  type: ADD_TODO,
  payload: new_todo
});

export const addTodoError = error => ({
  type: ADD_TODO_ERROR,
  error: "Something went wrong!"
});

export const deleteTodo = _id => ({
  type: DELETE_TODO,
  payload: _id
});

export const deleteTodoError = error => ({
  type: DELETE_TODO_ERROR,
  error: "Something went wrong!"
});

export const handleFetchTodos = () => async dispatch => {
  dispatch(fetchTodos());
  try {
    let { data } = await api.fetchTodos();
    dispatch(fetchTodosSuccess(data));
  } catch (error) {
    dispatch(fetchTodosError(error));
  }
};

export const handleAddTodo = (text, cleanup) => async dispatch => {
  try {
    let { data } = await api.addTodo(text);
    dispatch(addTodo(data));
    cleanup();
  } catch (error) {
    dispatch(addTodoError(error));
  }
};

export const handleDeleteTodo = _id => async dispatch => {
  try {
    await api.deleteTodo(_id);
    dispatch(deleteTodo(_id));
  } catch (error) {
    dispatch(deleteTodoError(error));
  }
};

const initialState = {
  isFetching: false,
  error: "",
  todos: []
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_TODOS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      };
    case FETCH_TODOS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        error: "",
        todos: action.payload
      };
    case ADD_TODO:
      return {
        ...state,
        error: "",
        todos: [...[action.payload], ...state.todos]
      };
    case ADD_TODO_ERROR:
      return {
        ...state,
        error: action.error
      };
    case DELETE_TODO:
      return {
        ...state,
        error: "",
        todos: state.todos.filter(t => t._id !== action.payload)
      };
    case DELETE_TODO_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default appReducer;

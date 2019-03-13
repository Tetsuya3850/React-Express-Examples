import api from "./api";

const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";
const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";
const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
const ADD_TODO = "ADD_TODO";
const ADD_TODO_FAILURE = "ADD_TODO_FAILURE";
const DELETE_TODO = "DELETE_TODO";
const DELETE_TODO_FAILURE = "DELETE_TODO_FAILURE";

export const fetchTodosRequest = () => ({
  type: FETCH_TODOS_REQUEST
});

export const fetchTodosSuccess = data => ({
  type: FETCH_TODOS_SUCCESS,
  payload: data
});

export const fetchTodosFailure = error => ({
  type: FETCH_TODOS_FAILURE,
  error: "Something went wrong!"
});

export const addTodo = new_todo => ({
  type: ADD_TODO,
  payload: new_todo
});

export const addTodoFailure = error => ({
  type: ADD_TODO_FAILURE,
  error: "Something went wrong!"
});

export const deleteTodo = _id => ({
  type: DELETE_TODO,
  payload: _id
});

export const deleteTodoFailure = error => ({
  type: DELETE_TODO_FAILURE,
  error: "Something went wrong!"
});

export const handleFetchTodos = () => async dispatch => {
  dispatch(fetchTodosRequest());
  try {
    let { data } = await api.fetchTodos();
    dispatch(fetchTodosSuccess(data));
  } catch (error) {
    dispatch(fetchTodosFailure(error));
  }
};

export const handleAddTodo = (text, cleanup) => async dispatch => {
  try {
    let { data } = await api.addTodo(text);
    dispatch(addTodo(data));
    cleanup();
  } catch (error) {
    dispatch(addTodoFailure(error));
  }
};

export const handleDeleteTodo = _id => async dispatch => {
  try {
    await api.deleteTodo(_id);
    dispatch(deleteTodo(_id));
  } catch (error) {
    dispatch(deleteTodoFailure(error));
  }
};

const initialState = {
  isFetching: false,
  error: "",
  todos: []
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS_REQUEST:
      return {
        ...state,
        isFetching: true
      };
    case FETCH_TODOS_FAILURE:
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
    case ADD_TODO_FAILURE:
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
    case DELETE_TODO_FAILURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default appReducer;

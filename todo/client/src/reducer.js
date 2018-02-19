import {
  RECEIVE_TODOS,
  ADD_NEW_TODO,
  TOGGLE_TODO,
  DELETE_TODO
} from "./actions";

const initialState = {
  todos: []
};

const todoAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TODOS:
    case ADD_NEW_TODO:
      return {
        todos: state.todos.concat(action.todos)
      };
    case TOGGLE_TODO:
      return {
        todos: state.todos.map(todo => {
          if (todo._id === action._id) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        })
      };
    case DELETE_TODO:
      return {
        todos: state.todos.filter(t => t._id !== action._id)
      };
    default:
      return state;
  }
};

export default todoAppReducer;

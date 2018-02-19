import { RECEIVE_TODOS, ADD_NEW_TODO, TOGGLE_TODO } from "./actions";

const todoReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_TODO:
      if (state._id === action._id) {
        return { ...state, done: !state.done };
      }
      return state;
    default:
      return state;
  }
};

const initialState = {
  todos: []
};

const todoAppReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_TODOS:
    case ADD_NEW_TODO:
      return {
        counters: state.todos.concat(action.todos)
      };
    case TOGGLE_TODO:
      return {
        todos: state.todos.map(todo => todoReducer(todo, action))
      };
    default:
      return state;
  }
};

export default todoAppReducer;

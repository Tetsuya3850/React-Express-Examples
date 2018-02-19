import React from "react";
import { connect } from "react-redux";
import actions from "../actions";
import Todo from "./Todo";

let TodoListContainer = ({ todos, onToggleTodo }) => (
  <ul>
    {todos.map(todo => (
      <Todo key={todo._id} {...todo} onClick={() => onToggleTodo(todo._id)} />
    ))}
  </ul>
);

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onToggleTodo: _id => {
      dispatch(actions.toggleTodo(_id));
    }
  };
};

TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(
  TodoListContainer
);

export default TodoListContainer;

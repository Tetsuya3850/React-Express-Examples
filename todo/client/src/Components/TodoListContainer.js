import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleTodo, deleteTodo } from "../reducer";
import Todo from "./Todo";

let TodoListContainer = ({ todos, toggleTodo, deleteTodo }) => (
  <ul
    style={{
      width: 170
    }}
  >
    {todos.map(todo => (
      <Todo
        key={todo._id}
        {...todo}
        onToggleClick={() => toggleTodo(todo._id)}
        onDeleteClick={() => deleteTodo(todo._id)}
      />
    ))}
  </ul>
);

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ toggleTodo, deleteTodo }, dispatch);
};

TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(
  TodoListContainer
);

export default TodoListContainer;

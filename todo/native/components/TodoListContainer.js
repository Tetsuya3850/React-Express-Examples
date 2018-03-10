import React from "react";
import { ScrollView } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleTodo, deleteTodo } from "../redux";
import Todo from "./Todo";

let TodoListContainer = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <ScrollView>
      {todos.map(todo => (
        <Todo
          key={todo._id}
          {...todo}
          onTogglePress={() => toggleTodo(todo._id)}
          onDeletePress={() => deleteTodo(todo._id)}
        />
      ))}
    </ScrollView>
  );
};

const mapStateToProps = ({ todos }) => {
  return {
    todos
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      toggleTodo,
      deleteTodo
    },
    dispatch
  );
};

TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(
  TodoListContainer
);

export default TodoListContainer;

import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleTodo, deleteTodo } from "./redux";
import Todo from "./Todo";

let TodoListContainer = ({ todos, onToggleTodo, onDeleteTodo }) => {
  return (
    <View>
      {todos.map(todo => (
        <Todo
          key={todo._id}
          {...todo}
          onTogglePress={() => onToggleTodo(todo._id)}
          onDeletePress={() => onDeleteTodo(todo._id)}
        />
      ))}
    </View>
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
      onToggleTodo: toggleTodo,
      onDeleteTodo: deleteTodo
    },
    dispatch
  );
};

TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(
  TodoListContainer
);

export default TodoListContainer;

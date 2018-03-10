import React from "react";
import { Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleTodo, deleteTodo } from "../redux";
import Todo from "./Todo";

let TodoListContainer = ({ isFetching, todos, toggleTodo, deleteTodo }) => {
  if (isFetching) {
    return <Text>LOADING</Text>;
  }
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

const mapStateToProps = state => {
  return state;
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

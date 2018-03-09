import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { receiveTodos } from "../actions";
import TodoListContainer from "./TodoListContainer";
import AddTodo from "./AddTodo";
import { Constants } from "expo";

class TodoApp extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    //dispatch(receiveTodos());
  }

  render() {
    return (
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>To Do List</Text>
        </View>
        <AddTodo />
        <TodoListContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4169E1",
    padding: Constants.statusBarHeight
  },
  title: {
    textAlign: "center",
    color: "white"
  }
});

export default connect()(TodoApp);

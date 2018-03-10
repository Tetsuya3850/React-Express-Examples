import React, { Component } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { receiveTodos } from "../redux";
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
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>To Do</Text>
        </View>
        <AddTodo />
        <TodoListContainer />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1
  },
  header: {
    backgroundColor: "#4169E1",
    padding: Constants.statusBarHeight,
    display: "flex",
    alignItems: "center"
  },
  title: {
    paddingTop: 10,
    color: "white"
  }
});

export default connect()(TodoApp);

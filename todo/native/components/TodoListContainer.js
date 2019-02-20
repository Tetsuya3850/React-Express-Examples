import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleFetchTodos, handleDeleteTodo } from "../reducers";
import Todo from "./Todo";

class TodoListContainer extends Component {
  componentDidMount() {
    this.props.handleFetchTodos();
  }

  render() {
    const { isFetching, error, todos, handleDeleteTodo } = this.props;

    return (
      <View style={styles.container}>
        {isFetching ? (
          <ActivityIndicator size="large" />
        ) : (
          <ScrollView>
            {todos.map(todo => (
              <Todo
                key={todo._id}
                task={todo.task}
                onDeletePress={() => handleDeleteTodo(todo._id)}
              />
            ))}
            <Text style={styles.error}>{error}</Text>
          </ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  error: {
    color: "red",
    textAlign: "center"
  }
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ handleFetchTodos, handleDeleteTodo }, dispatch);
};

TodoListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListContainer);

export default TodoListContainer;

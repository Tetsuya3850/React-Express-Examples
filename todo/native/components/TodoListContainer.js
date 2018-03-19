import React, { Component } from "react";
import {
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StyleSheet
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  handleFetchTodos,
  refreshTodos,
  toggleTodo,
  deleteTodo
} from "../reducer";
import Todo from "./Todo";

class TodoListContainer extends Component {
  componentDidMount() {
    this.props.handleFetchTodos();
  }

  _onRefresh = () => {
    this.props.refreshTodos();
  };

  render() {
    const {
      isFetching,
      refreshing,
      error,
      todos,
      toggleTodo,
      deleteTodo
    } = this.props;

    if (isFetching) {
      return <ActivityIndicator size="large" />;
    }

    return (
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />
        }
      >
        {todos.map(todo => (
          <Todo
            key={todo._id}
            {...todo}
            onTogglePress={() => toggleTodo(todo._id)}
            onDeletePress={() => deleteTodo(todo._id)}
          />
        ))}
        <Text style={styles.error}>{error}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    paddingTop: 15,
    textAlign: "center",
    color: "red"
  }
});

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      handleFetchTodos,
      refreshTodos,
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

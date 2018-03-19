import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleFetchTodos, toggleTodo, deleteTodo } from "../reducer";
import Todo from "./Todo";

class TodoListContainer extends Component {
  componentDidMount() {
    this.props.handleFetchTodos();
  }

  render() {
    const { todos, error, isFetching, toggleTodo, deleteTodo } = this.props;
    return (
      <div style={styles.todolist}>
        {isFetching ? (
          <p>LOADING</p>
        ) : (
          <ul>
            {todos.map(todo => (
              <Todo
                key={todo._id}
                {...todo}
                onToggleClick={() => toggleTodo(todo._id)}
                onDeleteClick={() => deleteTodo(todo._id)}
              />
            ))}
          </ul>
        )}
        <p style={styles.error}>{error}</p>
      </div>
    );
  }
}

const styles = {
  todolist: {
    textAlign: "center"
  },
  error: {
    color: "red"
  }
};

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { handleFetchTodos, toggleTodo, deleteTodo },
    dispatch
  );
};

TodoListContainer = connect(mapStateToProps, mapDispatchToProps)(
  TodoListContainer
);

export default TodoListContainer;

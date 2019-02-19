import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { handleFetchTodos, handleDeleteTodo } from "../reducers";
import Todo from "./Todo";

class TodoListContainer extends Component {
  componentDidMount() {
    this.props.handleFetchTodos();
  }

  render() {
    const { todos, error, isFetching, handleDeleteTodo } = this.props;

    return (
      <div
        style={{
          textAlign: "center"
        }}
      >
        {isFetching ? (
          <p>LOADING</p>
        ) : (
          <ul>
            {todos.map(todo => (
              <Todo
                key={todo._id}
                {...todo}
                onDeleteClick={() => handleDeleteTodo(todo._id)}
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
  error: {
    color: "red"
  }
};

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

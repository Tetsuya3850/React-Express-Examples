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
    const { isFetching, error, todos, handleDeleteTodo } = this.props;

    return (
      <div>
        {isFetching ? (
          <p>LOADING...</p>
        ) : (
          <ul>
            {todos.map(todo => (
              <Todo
                key={todo._id}
                text={todo.text}
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

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleFetchTodos, handleDeleteTodo }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoListContainer);

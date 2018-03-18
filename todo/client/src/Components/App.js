import React, { Component } from "react";
import { connect } from "react-redux";
import { handleFetchTodos } from "../reducer";
import AddTodo from "./AddTodo";
import TodoListContainer from "./TodoListContainer";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleFetchTodos());
  }

  render() {
    return (
      <div>
        <AddTodo />
        <TodoListContainer />
      </div>
    );
  }
}

export default connect()(App);

import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "./actions";
import AddTodo from "./AddTodo";
import TodoListContainer from "./TodoListContainer";

class App extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.receiveTodos());
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

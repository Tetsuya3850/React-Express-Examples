import React, { Component } from "react";
import AddTodo from "./AddTodo";
import TodoListContainer from "./TodoListContainer";

class App extends Component {
  render() {
    return (
      <div style={{ width: 200, display: "block", margin: "auto" }}>
        <AddTodo />
        <TodoListContainer />
      </div>
    );
  }
}

export default App;

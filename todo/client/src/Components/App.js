import React, { Component } from "react";
import AddTodo from "./AddTodo";
import TodoListContainer from "./TodoListContainer";

class App extends Component {
  render() {
    return (
      <div style={{ width: 180 }}>
        <AddTodo />
        <TodoListContainer />
      </div>
    );
  }
}

export default App;

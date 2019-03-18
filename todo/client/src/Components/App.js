import React, { Component } from "react";
import Header from "./Header";
import AddTodo from "./AddTodo";
import TodoListContainer from "./TodoListContainer";

class App extends Component {
  render() {
    return (
      <div style={styles.container}>
        <Header />
        <AddTodo />
        <TodoListContainer />
      </div>
    );
  }
}

const styles = {
  container: {
    width: 320,
    position: "relative",
    margin: "0 auto"
  }
};

export default App;

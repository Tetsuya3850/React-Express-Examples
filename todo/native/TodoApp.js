import React, { Component } from "react";
import { View } from "react-native";

import TodoListContainer from "./TodoListContainer";
import Input from "./Input";
import Title from "./Title";

export default class App extends Component {
  state = {
    todos: ["Click to remove", "Learn React Native", "Write Code", "Ship App"]
  };

  onAddTodo = text => {
    const { todos } = this.state;

    this.setState({
      todos: [text, ...todos]
    });
  };

  onRemoveTodo = index => {
    const { todos } = this.state;

    this.setState({
      todos: todos.filter((todo, i) => i !== index)
    });
  };

  render() {
    const { todos } = this.state;

    return (
      <View>
        <Title>To-Do List</Title>
        <Input
          placeholder={"What to get done?"}
          onSubmitEditing={this.onAddTodo}
        />
        <TodoListContainer />
      </View>
    );
  }
}

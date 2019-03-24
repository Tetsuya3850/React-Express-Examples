import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./src/configureStore";
import Header from "./src/components/Header";
import AddTodo from "./src/components/AddTodo";
import TodoListContainer from "./src/components/TodoListContainer";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Header title="Todo List" />
          <AddTodo />
          <TodoListContainer />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default App;

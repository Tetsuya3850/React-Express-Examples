import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./src/configureStore";
import Header from "./src/components/Header";
import AddTodo from "./src/components/AddTodo";
import TodoListContainer from "./src/components/TodoListContainer";

const store = configureStore();

export default class App extends React.Component {
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

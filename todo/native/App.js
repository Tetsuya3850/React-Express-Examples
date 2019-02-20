import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Header from "./components/Header";
import AddTodo from "./components/AddTodo";
import TodoListContainer from "./components/TodoListContainer";

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Header />
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

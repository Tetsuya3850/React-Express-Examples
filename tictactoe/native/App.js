import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./src/configureStore";
import TicTacToe from "./src/components/TicTacToe";

export const store = configureStore();

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TicTacToe />
      </Provider>
    );
  }
}

export default App;

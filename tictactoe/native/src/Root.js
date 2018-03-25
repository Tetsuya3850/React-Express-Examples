import React from "react";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import TicTacToe from "./components/TicTacToe";

export const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <TicTacToe />
      </Provider>
    );
  }
}

export default Root;

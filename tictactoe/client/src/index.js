import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import TicTacToe from "./components/TicTacToe";

export const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <TicTacToe />
  </Provider>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "font-awesome/css/font-awesome.min.css";
import configureStore from "./configureStore";
import TimerContainer from "./Components/TimerContainer";

export const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <TimerContainer />
  </Provider>,
  document.getElementById("root")
);

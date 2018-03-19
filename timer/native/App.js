import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import TimerContainer from "./components/TimerContainer";

export const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <TimerContainer />
      </Provider>
    );
  }
}

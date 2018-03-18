import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import TimerContainer from "./Components/TimerContainer";

export const store = configureStore();

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <TimerContainer />
      </Provider>
    );
  }
}

export default Root;

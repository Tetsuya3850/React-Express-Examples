import React, { Component } from "react";
import { Provider } from "react-redux";
import AppNavigator from "./routes";
import store from "./src/configureStore";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

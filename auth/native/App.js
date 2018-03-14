import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import Root from "./Root";

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}

export default App;

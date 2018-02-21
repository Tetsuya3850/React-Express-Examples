import React from "react";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import App from "./Components/App";

export const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

export default Root;

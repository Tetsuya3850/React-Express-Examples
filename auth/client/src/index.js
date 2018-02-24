import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import getRoutes from "./routes";

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>{getRoutes()}</Provider>,
  document.getElementById("root")
);

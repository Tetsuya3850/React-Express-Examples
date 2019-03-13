import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./reducers";

const store = createStore(
  appReducer,
  compose(applyMiddleware(thunkMiddleware))
);

export default store;

import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./reducers";

export default function configureStore() {
  return createStore(appReducer, compose(applyMiddleware(thunkMiddleware)));
}

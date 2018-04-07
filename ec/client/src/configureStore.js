import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import users from "./reducer/users";

export default function configureStore(preloadedState) {
  return createStore(
    users,
    preloadedState,
    compose(applyMiddleware(thunkMiddleware), window.devToolsExtension())
  );
}

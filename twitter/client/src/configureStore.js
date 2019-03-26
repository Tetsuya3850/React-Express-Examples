import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import appReducer from "./reducer/index";

export default function configureStore(preloadedState) {
  return createStore(
    appReducer,
    preloadedState,
    compose(applyMiddleware(thunkMiddleware), window.devToolsExtension())
  );
}

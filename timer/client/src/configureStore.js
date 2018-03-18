import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import timerAppReducer from "./reducer";

export default function configureStore(preloadedState) {
  return createStore(
    timerAppReducer,
    preloadedState,
    compose(applyMiddleware(thunkMiddleware), window.devToolsExtension())
  );
}

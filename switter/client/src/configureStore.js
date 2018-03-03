import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./reducer";

export default function configureStore(preloadedState) {
  return createStore(
    authReducer,
    preloadedState,
    compose(applyMiddleware(thunkMiddleware), window.devToolsExtension())
  );
}

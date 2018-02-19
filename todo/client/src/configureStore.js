import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import todoAppReducer from "./reducer";

export default function configureStore(preloadedState) {
  return createStore(
    todoAppReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware)
  );
}

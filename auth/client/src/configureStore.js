import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "./reducer";

export default function configureStore(preloadedState) {
  return createStore(
    authReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware)
  );
}

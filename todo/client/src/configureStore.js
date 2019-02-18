import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import todoAppReducer from "./reducers";

export default function configureStore(preloadedState) {
  return createStore(
    todoAppReducer,
    preloadedState,
    compose(
      applyMiddleware(thunkMiddleware),
      typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined" &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  );
}

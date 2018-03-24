import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import todoAppReducer from "./reducer";

export default function configureStore(preloadedState) {
  return createStore(
    todoAppReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

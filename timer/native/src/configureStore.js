import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import timerAppReducer from "./reducer";

export default function configureStore(preloadedState) {
  return createStore(
    timerAppReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

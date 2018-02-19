import { createStore } from "redux";
import timerAppReducer from "./reducer";

export default function configureStore(preloadedState) {
  return createStore(timerAppReducer, preloadedState);
}

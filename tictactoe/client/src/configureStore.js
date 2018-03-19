import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import ticTacToeReducer from "./reducer";

export default function configureStore(preloadedState) {
  return createStore(
    ticTacToeReducer,
    preloadedState,
    compose(applyMiddleware(thunkMiddleware), window.devToolsExtension())
  );
}

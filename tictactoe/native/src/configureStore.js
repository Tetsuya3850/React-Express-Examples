import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import ticTacToeReducer from "./reducer";

export default function configureStore(preloadedState) {
  return createStore(
    ticTacToeReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}

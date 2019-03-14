import auth from "./authReducer";
import article from "./articleReducer";
import feed from "./feedReducer";
import { combineReducers } from "redux";

const appReducer = combineReducers({ auth, article, feed });

export default appReducer;

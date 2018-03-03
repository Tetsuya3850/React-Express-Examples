import user from "./user";
import sweet from "./sweet";
import { combineReducers } from "redux";

const appReducer = combineReducers({ user, sweet });

export default appReducer;

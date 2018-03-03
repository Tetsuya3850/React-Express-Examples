import user from "./user";
import sweets from "./sweets";
import feed from "./feed";
import userSweets from "./userSweets";
import { combineReducers } from "redux";

const appReducer = combineReducers({ user, sweets, feed, userSweets });

export default appReducer;

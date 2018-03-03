import users from "./users";
import sweets from "./sweets";
import feed from "./feed";
import userSweets from "./userSweets";
import { combineReducers } from "redux";

const appReducer = combineReducers({ users, sweets, feed, userSweets });

export default appReducer;

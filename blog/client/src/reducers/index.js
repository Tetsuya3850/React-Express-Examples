import { combineReducers } from "redux";
import articles from "./articlesReducer";
import feed from "./feedReducer";
import users from "./usersReducer";

const appReducer = combineReducers({ articles, feed, users });

export default appReducer;

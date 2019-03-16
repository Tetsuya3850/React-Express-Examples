import { combineReducers } from "redux";
import articles from "./articlesReducer";
import users from "./usersReducer";
import feed from "./feedReducer";
import userFeed from "./userFeedReducer";

const appReducer = combineReducers({ articles, users, feed, userFeed });

export default appReducer;

import { combineReducers } from "redux";
import articles from "./articlesReducer";
import users from "./usersReducer";
import feed from "./feedReducer";
import userFeed from "./userFeedReducer";
import detail from "./detailReducer";

const appReducer = combineReducers({ articles, users, feed, userFeed, detail });

export default appReducer;

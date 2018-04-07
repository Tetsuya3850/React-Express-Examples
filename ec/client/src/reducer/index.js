import users from "./users";
import items from "./items";
import itemDetail from "./itemDetail";
import list from "./list";
import { combineReducers } from "redux";

const appReducer = combineReducers({
  users
});

export default appReducer;
